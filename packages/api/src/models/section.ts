/**
 * Section model
 *
 * @module       :: model
 * @description  :: Represent Section in database
 *
 *
 * Module dependencies
 */

import { Schema } from 'mongoose';

/**
 * Section schema
 */

export default new Schema({
  title: String,
  description: String,
  name: String,
  content: String,
  icon: String,
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  status: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
});
