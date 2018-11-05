/**
 * Course model
 *
 * @module       :: model
 * @description  :: Represent Course in database
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * Course schema
 */

const CourseSchema = new Schema({
  title: String,
  description: String,
  name: String,
  content: String,
  thumb: String,
  icon: String,
  price: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  tags: Array,
  sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
  lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  }
});

/**
 * Register
 */

mongoose.model('Course', CourseSchema);
