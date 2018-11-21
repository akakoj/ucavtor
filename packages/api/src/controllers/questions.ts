/**
 * Questions controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle questions ( create, update and etc )
 *
 * Vendor
 */

import mongoose from 'mongoose';
import { send, json } from 'micro';
import { ServerRequest, ServerResponse } from 'microrouter';

/**
 * Model
 */

import { QuestionSchema } from '../models';
import { IQuestionModel } from '../global';

const Question = mongoose.model('Question', QuestionSchema);

/*!
 * Expos
 */

export const index = async (req: ServerRequest, res: ServerResponse) => {
  const questions = await Question.find({ course: req.params.id });

  return send(res, 200, questions);
};

export const show = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const question = await Question.findOne({ _id: req.params.id });

    return send(res, 200, question);
  } catch (e) {
    return send(res, 500);
  }
};

export const create = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = await json(req);
    const question = await Question.create(data);

    return send(res, 200, question);
  } catch (e) {
    return send(res, 500);
  }
};

export const update = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = <IQuestionModel> await json(req);
    const { id } = data;

    const question = await Question.findOneAndUpdate({ _id: id }, data, { new: true });

    return send(res, 200, question);
  } catch (e) {
    return send(res, 500);
  }
};

export const destroy = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const { id } = <IQuestionModel> await json(req);

    await Question.remove(id);

    return send(res, 200);
  } catch (e) {
    return send(res, 500);
  }
};
