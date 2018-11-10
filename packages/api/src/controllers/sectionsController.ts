/**
 * Sections controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle sections ( create, update and etc )
 *
 * Vendor
 */

import { send, json } from 'micro';
import mongoose from 'mongoose';

/**
 * Model
 */

import SectionSchema from '../models/Section';
import CourseSchema from '../models/Course';

const Section = mongoose.model('Section', SectionSchema);
const Course = mongoose.model('Course', CourseSchema);

/*!
 * Expos
 */

export const index = async (req, res) => {
  const sections = await Section.find();

  return send(res, 200, sections);
};

export const show = async (req, res) => {
  try {
    const section = await Section.findOne({ slug: req.params.slug });
    const courses = await Course.find({ sections: section._id });

    section.courses = courses;

    return send(res, 200, section);
  } catch (e) {
    return send(res, 500, e);
  }
};

export const create = async (req, res) => {
  try {
    const data = await json(req);
    const section = await Section.create(data);

    return send(res, 200, section);
  } catch (e) {
    return send(res, 500, e);
  }
};

export const update = async (req, res) => {
  try {
    const data = await json(req);
    const { _id } = data;

    const section = await Section.findOneAndUpdate({ _id }, data, { new: true });

    return send(res, 200, section);
  } catch (e) {
    return send(res, 500, e);
  }
};

export const destroy = async (req, res) => {
  try {
    const data = await json(req);
    const { _id } = data;

    await Section.remove(_id);

    return send(res, 200);
  } catch (e) {
    return send(res, 500, e);
  }
};
