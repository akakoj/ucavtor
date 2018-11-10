/**
 * Settings controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle settings ( create, update and etc )
 *
 * Vendor
 */

import { send, json } from 'micro';
import mongoose from 'mongoose';

/**
 * Model
 */

import SettingsSchema from '../models/Settings';

const Settings = mongoose.model('Settings', SettingsSchema);

/*!
 * Expos
 */

export const index = async (req, res) => {
  const settings = await Settings.find();

  return send(res, 200, settings);
};

export const create = async (req, res) => {
  try {
    const data = await json(req);
    const settings = await Settings.create(data);

    return send(res, 200, settings);
  } catch (e) {
    return send(res, 500);
  }
};

export const update = async (req, res) => {
  try {
    const data = await json(req);
    const { _id } = data;

    const settings = await Settings.findOneAndUpdate({ _id }, data, { new: true });

    return send(res, 200, settings);
  } catch (e) {
    return send(res, 500);
  }
};

export const destroy = async (req, res) => {
  try {
    const data = await json(req);
    const { _id } = data;

    await Settings.remove(_id);

    return send(res, 200);
  } catch (e) {
    return send(res, 500);
  }
};
