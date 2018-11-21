/**
 * Paymens controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle payments ( create, update and etc )
 *
 * Vendor
 */

import mongoose from 'mongoose';
import { send, json } from 'micro';
import { decode } from 'jsonwebtoken';
import { ServerRequest, ServerResponse } from 'microrouter';

import { init, status } from '../utils/payture';

/**
 * Models
 */

import {
  UserSchema,
  CourseSchema,
  PaymentSchema,
} from '../models';

import {
  IUserModel,
  ICourseModel,
  IPaymentModel,
  IPaymentStatus,
  IPaymentParams,
} from '../global';

const User    = mongoose.model('User', UserSchema);
const Course  = mongoose.model('Course', CourseSchema);
const Payment = mongoose.model('Payment', PaymentSchema);

/*!
 * Expos
 */

export const index = async (_req: ServerRequest, res: ServerResponse) => {
  try {
    const payments = await Payment.find();

    return send(res, 200, payments);
  } catch (e) {
    return send(res, 500);
  }
};

export const show = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const payment = await Payment.find({ user: req.params.id })
      .populate('user')
      .populate('course');

    return send(res, 200, payment);
  } catch (e) {
    return send(res, 500);
  }
};

export const create = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const { userId, courseId } = <IPaymentParams> await json(req);

    const user = <IUserModel> await User.findOne({ _id: userId });
    const course = <ICourseModel> await Course.findOne({ _id: courseId });

    const payment = <IPaymentModel> await Payment.create({
      user: user.id,
      course: course.id,
      ip: String(req.connection.remoteAddress),
      total: course.price,
    });

    const data = {
      OrderId: String(payment._id),
      Amount: course.price * 100,
      IP: req.headers['x-forwarded-for'],
      SessionType: 'Pay',
      Url: `http://dashboard.ucavtor.ru/payments?orderid=${String(payment._id)}&result=success`,
      Language: 'RU',
      Total: course.price,
      Product: `Курс ${course.name}`,
    }

    const initStatus = <IPaymentStatus> await init(data);
    payment.ip = <string> req.headers['x-forwarded-for'];
    payment.sessionId = initStatus.SessionId;

    await payment.save();

    if (initStatus.Success === 'True') { return send(res, 200, initStatus); }

    return send(res, 500);
  } catch (e) {
    return send(res, 500);
  }
};

export const update = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = <IPaymentModel> await json(req);
    const { id } = data;

    const payment = <IPaymentModel>await Payment.findOneAndUpdate(
      { _id: id }, data, { new: true }
    );

    if (payment.state === 'Charged') {
      const user = <IUserModel> await User.findOne({ _id: payment.user });
      user.courses.push(payment.course);

      await user.save();
    }

    return send(res, 200, payment);
  } catch (e) {
    return send(res, 500);
  }
};

export const check = async (req: ServerRequest, res: ServerResponse) => {
  try {
    // @ts-ignore
    const token = req.headers['authorization'].split(' ')[1];
    const { id } = <IPaymentModel> decode(token);

    const payments = await Payment.find({ user: id, state: 'processing' });
    await Promise.all(payments.map(payment => status(String(payment._id))));

    return send(res, 200);
  } catch (e) {
    return send(res, 500);
  }
};
