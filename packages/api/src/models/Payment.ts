/**
 * Payment model
 *
 * @module       :: model
 * @description  :: Represent Payment in database
 *
 *
 * Module dependencies
 */

const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;

/**
 * Payment schema
 */

const PaymentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  ip: String,
  state: {
    type: String,
    default: 'processing'
  }
});

/**
 * Register
 */

mongoose.model('Payment', PaymentSchema);
