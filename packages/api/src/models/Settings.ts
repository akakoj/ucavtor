/**
 * Settings model
 *
 * @module       :: model
 * @description  :: Represent Settings in database
 *
 *
 * Module dependencies
 */

const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;

/**
 * Settings schema
 */

const SettingsSchema = new Schema({
  name: String,
  value: String,

  slug: {
    type: String,
    unique: true,
    required: true,
  },
});

/**
 * Register
 */

mongoose.model('Settings', SettingsSchema);
