/**
 * Pages controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle pages ( create, update and etc )
 *
 * Vendor
 */

import mongoose from 'mongoose';
import { send, json } from 'micro';
import { ServerRequest, ServerResponse } from 'microrouter';

/**
 * Model
 */

import { IPage, IPageModel } from '../global';
import { PageSchema } from '../models';

const Page = mongoose.model('Page', PageSchema);

/*!
 * Expos
 */

export const index = async (_req: ServerRequest, res: ServerResponse) => {
  const pages = await Page.find();

  return send(res, 200, pages);
};

export const show = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const page = <IPageModel> await Page.findOne({ slug: req.params.slug });

    return send(res, 200, page);
  } catch (e) {
    return send(res, 500);
  }
};

export const create = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = <IPage> await json(req);
    const page = <IPageModel> await Page.create(data);

    return send(res, 200, page);
  } catch(e) {
    return send(res, 500);
  }
};

export const update = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = <IPageModel> await json(req);

    const page = await Page.findOneAndUpdate({ _id: data.id }, data, { new: true });

    return send(res, 200, page);
  } catch(e) {
    return send(res, 500);
  }
};

export const destroy = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const { id } = <IPageModel> await json(req);

    await Page.remove(id);

    return send(res, 200);
  } catch (e) {
    return send(res, 500);
  }
};
