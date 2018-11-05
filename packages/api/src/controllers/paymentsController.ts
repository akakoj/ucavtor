/**
 * Paymens controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle payments ( create, update and etc )
 *
 *
 * Module dependencies
 */

const mongoose         = require('mongoose');
const { decode }       = require('jsonwebtoken');
const { send, json }   = require('micro');
const { init, status } = require('../utils/payture');

const User    = mongoose.model('User');
const Course  = mongoose.model('Course');
const Payment = mongoose.model('Payment');


/*!
 * Expos
 */

exports.index = async (req, res) => {
  try {
    const payments = await Payment.find();

    return send(res, 200, payments);
  } catch(e) {
    return send(res, 500, e);
  }
};

exports.show = async (req, res) => {
  try {
    const payment = await Payment.find({ user: req.params.id })
      .populate('user')
      .populate('course');
    
    return send(res, 200, payment);
  } catch(e) {
    return send(res, 500, e);
  }
}

exports.create = async (req, res) => {
  try {
    const { userId, courseId } = await json(req);
    const user = await User.findOne({ _id: userId });
    const course = await Course.findOne({ _id: courseId }); 
    const payment = await Payment.create({
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
      Url: `http://dashboard.ucavtor.ru/payments?orderid={orderid}&result={success}`,
      Language: 'RU',
      Total: course.price,
      Product: `"Курс ${course.name}"`,
    }

    const initStatus = await init(data);
    payment.ip = req.headers['x-forwarded-for'];
    payment.sessionId = initStatus.SessionId;

    await payment.save();

    if (initStatus.Success === "True") { return send(res, 200, initStatus); } 

    return send(res, 500);
  } catch(e) {
    return send(res, 500, e);
  }
};

exports.update = async (req, res) => {
  try {
    const data = await json(req);
    const { _id } = data;

    const payment = await Payment.findOneAndUpdate({ _id }, data, { new: true });

    if (payment.state === 'Charged') {
      const user = await User.findOne({ _id: payment.user });
      user.courses.push(payment.course);
      
      await user.save();
    }

    return send(res, 200, payment);
  } catch(e) {
    return send(res, 500, e);
  }
};

exports.check = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { _id }  = decode(token);

    const payments = await Payment.find({ user: _id, state: 'processing' });
    const results = await Promise.all(payments.map(payment => status(String(payment._id)) ));
  
    results.forEach(result => {
      console.info(result);
    });

    return send(res, 200);
  } catch(e) {
    return send(res, 500, e);
  }
};
