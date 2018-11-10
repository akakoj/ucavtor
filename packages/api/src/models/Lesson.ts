/**
 * Lesson model
 *
 * @module       :: model
 * @description  :: Represent Lesson in database
 *
 *
 * Module dependencies
 */

import { Schema } from 'mongoose';

/**
 * Lesson schema
 */

export default new Schema({
  name: String,
  content: String,
});
