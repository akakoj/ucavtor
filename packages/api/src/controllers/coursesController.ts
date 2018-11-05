/**
 * Courses controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle courses( create, update and etc )
 *
 *
 * Module dependencies
 */
const { send, json } = require('micro');
const mongoose = require('mongoose');

const Course = mongoose.model('Course');

/*!
 * Expos
 */

exports.index = async (req, res) => {
  try {
    const courses = await Course.find();

    return send(res, 200, courses);
  } catch(e) {
    return send(res, 500, e);
  }
};

exports.show = async (req, res) => {
  try {
    const id = req.params.id;
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: req.params.id }
      : { slug: req.params.id }

    const course = await Course.findOne(query).populate('sections').populate('lessons').populate('tests');
    
    return send(res, 200, course);
  } catch(e) {
    return send(res, 500, e);
  }
}

exports.create = async (req, res) => {
  try {
    const data = await json(req);
    const course = await Course.create(data);

    return send(res, 200, course);
  } catch(e) {
    return send(res, 500, e);
  }
};

exports.update = async (req, res) => {
  const data = await json(req);
  const { _id } = data;

  const course = await Course.findOneAndUpdate({ _id }, data, { new: true });

  return send(res, 200, course);
};

exports.delete = async (req, res) => {
  try {
    const data   = await json(req);
    const course = await Course.remove(data);
    
    return send(res, 200);
  } catch(e) {
    return send(res, 500);
  }
};
