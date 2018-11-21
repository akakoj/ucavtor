/**
 * Lessons controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle lessons ( create, update and etc )
 *
 * Vendor
 */

import mongoose from 'mongoose';
import { send, json } from 'micro';
import { ServerRequest, ServerResponse } from 'microrouter';

/*!
 * Model
 */

import { CourseSchema, LessonSchema } from '../models';
import { ILesson, ICourseModel, ILessonModel, IRequestParams } from '../global';

const Lesson = mongoose.model('Lesson', LessonSchema);
const Course = mongoose.model('Course', CourseSchema);

/*!
 * Expos
 */

export const index = async (_req: ServerRequest, res: ServerResponse) => {
  const lessons = await Lesson.find();

  return send(res, 200, lessons);
};

export const show = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const lesson = await Lesson.findOne({ _id: req.params.id });

    return send(res, 200, lesson);
  } catch (e) {
    return send(res, 500, e);
  }
};

export const create = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data   = <ILesson> await json(req);
    const lesson = <ILessonModel> await Lesson.create(data);
    const course = <ICourseModel> await Course.findOne({ _id: data.course });

    course.lessons.push(lesson._id);

    await course.save();

    return send(res, 200, lesson);
  } catch (e) {
    return send(res, 500);
  }
};

export const update = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = <IRequestParams> await json(req);
    const { id } = data;

    const lesson = await Lesson.findOneAndUpdate({ _id: id }, data, { new: true });

    return send(res, 200, lesson);
  } catch (e) {
    return send(res, 500);
  }
};

export const destroy = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = <ILessonModel> await json(req);

    await Lesson.remove(data);

    return send(res, 200);
  } catch (e) {
    return send(res, 500);
  }
};
