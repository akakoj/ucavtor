/**
 * Page model
 *
 * @module       :: model
 * @description  :: Represent Page in database
 *
 *
 * Module dependencies
 */

import { Schema } from 'mongoose';

/**
 * Page schema
 */

export default new Schema({
  title: String,
  description: String,
  name: String,
  content: String,

  slug: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
});
