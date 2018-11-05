/**
 * Question model
 *
 * @module       :: model
 * @description  :: Represent Question in database
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * Question schema
 */

const QuestionSchema = new Schema({
  question: String,
  answers: { type: Array, default: [] },
  rightAnswer: { type: Number, default: 0 },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
});

/**
 * Register
 */

mongoose.model('Question', QuestionSchema);
