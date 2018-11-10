/**
 * Pages controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle pages ( create, update and etc )
 *
 * Vendor
 */

import { send, json } from 'micro';
import mongoose from 'mongoose';

/**
 * Model
 */

import PageSchema from '../models/Page';

const Page = mongoose.model('Page', PageSchema);

/*!
 * Expos
 */

export const index = async (req, res) => {
  const pages = await Page.find();

  return send(res, 200, pages);
};

export const show = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });

    return send(res, 200, page);
  } catch (e) {
    return send(res, 500, e);
  }
};

export const create = async (req, res) => {
  const data = await json(req);
  const page = await Page.create(data);

  return send(res, 200, page);
};

export const update = async (req, res) => {
  const data = await json(req);
  const { _id } = data;

  const page = await Page.findOneAndUpdate({ _id }, data, { new: true });

  return send(res, 200, page);
};

export const destroy = async (req, res) => {
  try {
    const data = await json(req);
    const { _id } = data;

    await Page.remove(_id);

    return send(res, 200);
  } catch (e) {
    return send(res, 500);
  }
};
