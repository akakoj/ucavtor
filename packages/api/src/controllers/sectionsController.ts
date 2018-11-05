/**
 * Sections controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle sections ( create, update and etc )
 *
 *
 * Module dependencies
 */

const { send, json } = require('micro');
const mongoose = require('mongoose');

const Section = mongoose.model('Section');
const Course = mongoose.model('Course');

/*!
 * Expos
 */

exports.index = async (req, res) => {
  const sections = await Section.find();

  return send(res, 200, sections);
};

exports.show = async (req, res) => {
  try {
    const section = await Section.findOne({ slug: req.params.slug });
    const courses = await Course.find({ sections: section._id });

    section.courses = courses;

    return send(res, 200, section);
  } catch(e) {
    return send(res, 500, e);
  }
}

exports.create = async (req, res) => {
  const data = await json(req);
  const section = await Section.create(data);

  return send(res, 200, section);
};

exports.update = async (req, res) => {
  const data = await json(req);
  const { _id } = data;

  const section = await Section.findOneAndUpdate({ _id }, data, { new: true });

  return send(res, 200, section);
};

exports.delete = async (req, res) => {
  const data = await json(req);
  const { _id } = data;

  const section = await Section.remove(_id);

  return send(res, 200);
};
