/**
 * Section model
 *
 * @module       :: model
 * @description  :: Represent Section in database
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * Section schema
 */

const SectionSchema = new Schema({
  title: String,
  description: String,
  name: String,
  content: String,
  icon: String,
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  status: {
    type: Number,
    default: 0
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
});

/**
 * Register
 */

mongoose.model('Section', SectionSchema);
