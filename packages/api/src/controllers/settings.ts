/**
 * Settings controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle settings ( create, update and etc )
 *
 * Vendor
 */

import mongoose from 'mongoose';
import { send, json } from 'micro';
import { ServerRequest, ServerResponse } from 'microrouter';

/**
 * Model
 */

import { ISettings, ISettingsModel } from '../global';
import { SettingsSchema } from '../models';

const Settings = mongoose.model('Settings', SettingsSchema);

/*!
 * Expos
 */

export const index = async (_req: ServerRequest, res: ServerResponse) => {
  const settings = await Settings.find();

  return send(res, 200, settings);
};

export const create = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = <ISettings> await json(req);
    const settings = <ISettingsModel> await Settings.create(data);

    return send(res, 200, settings);
  } catch (e) {
    return send(res, 500);
  }
};

export const update = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = <ISettingsModel> await json(req);
    const { id } = data;

    const settings = await Settings.findOneAndUpdate(
      { _id: id }, data, { new: true }
    );

    return send(res, 200, settings);
  } catch (e) {
    return send(res, 500);
  }
};

export const destroy = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = <ISettingsModel> await json(req);
    const { id } = data;

    await Settings.remove(id);

    return send(res, 200);
  } catch (e) {
    return send(res, 500);
  }
};
