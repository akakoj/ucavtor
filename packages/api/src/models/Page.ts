/**
 * Page model
 *
 * @module       :: model
 * @description  :: Represent Page in database
 *
 *
 * Module dependencies
 */

const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;

/**
 * Page schema
 */

const PageSchema = new Schema({
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
    default: 0
  }
});

/**
 * Register
 */

mongoose.model('Page', PageSchema);
