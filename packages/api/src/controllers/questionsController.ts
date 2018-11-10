/**
 * Questions controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle questions ( create, update and etc )
 *
 * Vendor
 */

import { send, json } from 'micro';
import mongoose from 'mongoose';

/**
 * Model
 */

import QuestionSchema from '../models/Question';

const Question = mongoose.model('Question', QuestionSchema);

/*!
 * Expos
 */

export const index = async (req, res) => {
  const questions = await Question.find({ course: req.params.id });

  return send(res, 200, questions);
};

export const show = async (req, res) => {
  try {
    const question = await Question.findOne({ _id: req.params.id });

    return send(res, 200, question);
  } catch (e) {
    return send(res, 500, e);
  }
};

export const create = async (req, res) => {
  const data = await json(req);
  const question = await Question.create(data);

  return send(res, 200, question);
};

export const update = async (req, res) => {
  const data = await json(req);
  const { _id } = data;

  const question = await Question.findOneAndUpdate({ _id }, data, { new: true });

  return send(res, 200, question);
};

export const destroy = async (req, res) => {
  const data = await json(req);
  const { _id } = data;

  await Question.remove(_id);

  return send(res, 200);
};
