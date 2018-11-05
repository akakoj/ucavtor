/**
 * Posts controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle posts ( create, update and etc )
 *
 *
 * Module dependencies
 */
const { send, json } = require('micro');
const mongoose = require('mongoose');

const Post = mongoose.model('Post');

/*!
 * Expos
 */

exports.index = async (req, res) => {
  const posts = await Post.find();

  return send(res, 200, posts);
};

exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id });
    
    return send(res, 200, post);
  } catch(e) {
    return send(res, 500, e);
  }
}

exports.create = async (req, res) => {
  const data = await json(req);
  const post = await Post.create(data);

  return send(res, 200, post);
};

exports.update = async (req, res) => {
  const data = await json(req);
  const { _id } = data;

  const post = await Post.findOneAndUpdate({ _id }, data, { new: true });

  return send(res, 200, post);
};

exports.delete = async (req, res) => {
  const data = await json(req);
  const { _id } = data;

  const post = await Post.remove(_id);

  return send(res, 200);
};
