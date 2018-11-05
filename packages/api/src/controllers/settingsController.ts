/**
 * Settings controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle settings ( create, update and etc )
 *
 *
 * Module dependencies
 */
const { send, json } = require('micro');
const mongoose = require('mongoose');

const Settings = mongoose.model('Settings');

/*!
 * Expos
 */

exports.index = async (req, res) => {
  const settings = await Settings.find();

  return send(res, 200, settings);
};

exports.create = async (req, res) => {
  const data = await json(req);
  const settings = await Settings.create(data);

  return send(res, 200, settings);
};

exports.update = async (req, res) => {
  const data = await json(req);
  const { _id } = data;

  const settings = await Settings.findOneAndUpdate({ _id }, data, { new: true });

  return send(res, 200, settings);
};

exports.delete = async (req, res) => {
  const data = await json(req);
  const { _id } = data;

  const settings = await Settings.remove(_id);

  return send(res, 200);
};
