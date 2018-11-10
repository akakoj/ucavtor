/**
 * Post model
 *
 * @module       :: model
 * @description  :: Represent Post in database
 *
 *
 * Module dependencies
 */

import { Schema } from 'mongoose';

/**
 * Post schema
 */

export default new Schema({
  title: String,
  description: String,
  name: String,
  content: String,
  thumb: String,
  tags: Array,
  rubrics: Array,

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
