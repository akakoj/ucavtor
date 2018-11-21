/**
 * Sections controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle sections ( create, update and etc )
 *
 * Vendor
 */

import mongoose from 'mongoose';
import { send, json } from 'micro';
import { ServerRequest, ServerResponse } from 'microrouter';

/**
 * Model
 */

import {
  SectionSchema,
  CourseSchema,
} from '../models';

import { ISectionModel, ICourseModel, ISection } from '../global';

const Section = mongoose.model('Section', SectionSchema);
const Course = mongoose.model('Course', CourseSchema);

/*!
 * Expos
 */

export const index = async (_req: ServerRequest, res: ServerResponse) => {
  const sections = await Section.find();

  return send(res, 200, sections);
};

export const show = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const section = <ISectionModel> await Section.findOne({ slug: req.params.slug });
    const courses = <ICourseModel[]> await Course.find({ sections: section.id });

    section.courses = courses;

    return send(res, 200, section);
  } catch (e) {
    return send(res, 500);
  }
};

export const create = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = <ISection> await json(req);
    const section = <ISectionModel> await Section.create(data);

    return send(res, 200, section);
  } catch (e) {
    return send(res, 500);
  }
};

export const update = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = <ISectionModel> await json(req);
    const { id } = data;

    const section = await Section.findOneAndUpdate({ _id: id }, data, { new: true });

    return send(res, 200, section);
  } catch (e) {
    return send(res, 500);
  }
};

export const destroy = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = <ISectionModel> await json(req);
    const { id } = data;

    await Section.remove(id);

    return send(res, 200);
  } catch (e) {
    return send(res, 500);
  }
};
