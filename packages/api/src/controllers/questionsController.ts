/**
 * Questions controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle questions ( create, update and etc )
 *
 *
 * Module dependencies
 */
const { send, json } = require('micro');
const mongoose = require('mongoose');

const Question = mongoose.model('Question');

/*!
 * Expos
 */

exports.index = async (req, res) => {
  const questions = await Question.find({ course: req.params.id });

  return send(res, 200, questions);
};

exports.show = async (req, res) => {
  try {
    const question = await Question.findOne({ _id: req.params.id });
    
    return send(res, 200, question);
  } catch(e) {
    return send(res, 500, e);
  }
}

exports.create = async (req, res) => {
  const data = await json(req);
  const question = await Question.create(data);

  return send(res, 200, question);
};

exports.update = async (req, res) => {
  const data = await json(req);
  const { _id } = data;

  const question = await Question.findOneAndUpdate({ _id }, data, { new: true });

  return send(res, 200, question);
};

exports.delete = async (req, res) => {
  const data = await json(req);
  const { _id } = data;

  const question = await Question.remove(_id);

  return send(res, 200);
};
