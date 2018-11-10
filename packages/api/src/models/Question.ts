/**
 * Question model
 *
 * @module       :: model
 * @description  :: Represent Question in database
 *
 *
 * Module dependencies
 */

import { Schema } from 'mongoose';

/**
 * Question schema
 */

export default new Schema({
  question: String,
  answers: { type: Array, default: [] },
  rightAnswer: { type: Number, default: 0 },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
});
