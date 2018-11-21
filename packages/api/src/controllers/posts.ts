/**
 * Posts controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle posts ( create, update and etc )
 *
 * Vendor
 */

import mongoose from 'mongoose';
import { send, json } from 'micro';
import { ServerRequest, ServerResponse } from 'microrouter';

/**
 * Model
 */

import { IPost } from '../global';
import { PostSchema } from '../models';

const Post = mongoose.model('Post', PostSchema);

/*!
 * Expos
 */

export const index = async (_req: ServerRequest, res: ServerResponse) => {
  const posts = await Post.find();

  return send(res, 200, posts);
};

export const show = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id });

    return send(res, 200, post);
  } catch (e) {
    return send(res, 500, e);
  }
};

export const create = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = await json(req);
    const post = await Post.create(data);

    return send(res, 200, post);
  } catch (e) {
    return send(res, 500);
  }
};

export const update = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = await json(req) as IPost;
    const { id } = data;

    const post = await Post.findOneAndUpdate({ _id: id }, data, { new: true });

    return send(res, 200, post);
  } catch (e) {
    return send(res, 500);
  }
};

export const destroy = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = await json(req) as IPost;
    const { id } = data;

    await Post.remove(id);

    return send(res, 200);
  } catch (e) {
    return send(res, 500);
  }
};
