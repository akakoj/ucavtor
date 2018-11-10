/**
 * Settings model
 *
 * @module       :: model
 * @description  :: Represent Settings in database
 *
 *
 * Module dependencies
 */

import { Schema } from 'mongoose';

/**
 * Settings schema
 */

export default new Schema({
  name: String,
  value: String,

  slug: {
    type: String,
    unique: true,
    required: true,
  },
});
