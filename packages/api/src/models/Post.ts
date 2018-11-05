/**
 * Post model
 *
 * @module       :: model
 * @description  :: Represent Post in database
 *
 *
 * Module dependencies
 */

const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;

/**
 * Post schema
 */

const PostSchema = new Schema({
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
    default: 0
  }
});

/**
 * Register
 */

mongoose.model('Post', PostSchema);
