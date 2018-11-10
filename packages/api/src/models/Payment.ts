/**
 * Payment model
 *
 * @module       :: model
 * @description  :: Represent Payment in database
 *
 *
 * Module dependencies
 */

import { Schema } from 'mongoose';

/**
 * Payment schema
 */

export default new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  ip: String,
  state: {
    type: String,
    default: 'processing',
  },
});
