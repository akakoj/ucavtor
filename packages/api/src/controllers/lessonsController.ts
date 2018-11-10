/**
 * Lessons controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle lessons ( create, update and etc )
 *
 * Vendor
 */

import { send, json } from 'micro';
import mongoose from 'mongoose';

/**
 * Model
 */

import LessonSchema from '../models/Lesson';
import CourseSchema from '../models/Course';

const Lesson = mongoose.model('Lesson', LessonSchema);
const Course = mongoose.model('Course', CourseSchema);

/*!
 * Expos
 */

export const index = async (req, res) => {
  const lessons = await Lesson.find();

  return send(res, 200, lessons);
};

export const show = async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ _id: req.params.id });

    return send(res, 200, lesson);
  } catch (e) {
    return send(res, 500, e);
  }
};

export const create = async (req, res) => {
  const data = await json(req);
  const lesson = await Lesson.create(data);
  const course = await Course.findOne({ _id: data.course });

  course.lessons.push(lesson._id);

  await course.save();

  return send(res, 200, lesson);
};

export const update = async (req, res) => {
  const data = await json(req);
  const { _id } = data;

  const lesson = await Lesson.findOneAndUpdate({ _id }, data, { new: true });

  return send(res, 200, lesson);
};

export const destroy = async (req, res) => {
  const data = await json(req);

  await Lesson.remove(data);

  return send(res, 200);
};
