/**
 * Courses controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle courses( create, update and etc )
 *
 * Vendor
 */

import mongoose from 'mongoose';
import { send, json } from 'micro';
import { ServerRequest, ServerResponse } from 'microrouter';

import { IRequestParams, ICourseModel } from '../global';

/*!
 * Model
 */

import { CourseSchema } from '../models';

const Course = mongoose.model('Course', CourseSchema);

/*!
 * Expos
 */

export const index = async (_req: ServerRequest, res: ServerResponse) => {
  try {
    const courses = await Course.find();

    return send(res, 200, courses);
  } catch (e) {
    return send(res, 500);
  }
};

export const show = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const { id } = <ICourseModel> await json(req);
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { slug: id };

    const course = await Course.findOne(query)
      .populate('sections')
      .populate('lessons')
      .populate('tests');

    return send(res, 200, course);
  } catch (e) {
    return send(res, 500);
  }
};

export const create = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = await json(req);
    const course = await Course.create(data);

    return send(res, 200, course);
  } catch (e) {
    return send(res, 500);
  }
};

export const update = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = <IRequestParams> await json(req);
    const { id } = data;

    const course = await Course.findOneAndUpdate({ _id: id }, data, { new: true });

    return send(res, 200, course);
  } catch (e) {
    return send(res, 500);
  }
};

export const destroy = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const { id } = <ICourseModel> await json(req);

    await Course.remove(id);

    return send(res, 200);
  } catch (e) {
    return send(res, 500);
  }
};
