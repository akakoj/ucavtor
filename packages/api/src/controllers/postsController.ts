/**
 * Posts controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle posts ( create, update and etc )
 *
 * Vendor
 */

import { send, json } from 'micro';
import mongoose from 'mongoose';

/**
 * Model
 */

import PostSchema from '../models/Post';

const Post = mongoose.model('Post', PostSchema);

/*!
 * Expos
 */

export const index = async (req, res) => {
  const posts = await Post.find();

  return send(res, 200, posts);
};

export const show = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id });

    return send(res, 200, post);
  } catch (e) {
    return send(res, 500, e);
  }
};

export const create = async (req, res) => {
  const data = await json(req);
  const post = await Post.create(data);

  return send(res, 200, post);
};

export const update = async (req, res) => {
  const data = await json(req);
  const { _id } = data;

  const post = await Post.findOneAndUpdate({ _id }, data, { new: true });

  return send(res, 200, post);
};

export const destroy = async (req, res) => {
  const data = await json(req);
  const { _id } = data;

  await Post.remove(_id);

  return send(res, 200);
};
