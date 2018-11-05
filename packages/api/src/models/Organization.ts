/**
 * Organization model
 *
 * @module       :: model
 * @description  :: Represent Organization in database
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * Organization schema
 */

const OrganizationSchema = new Schema({
  name: String,
  inn: String,
  kpp: String,
  bankAccount: String,
  bic: String,
  address: String,
  representativeFio: String,
  representativePosition: String,
  representativePhone: String,
  managerFio: String,
  managerPosition: String,
  managerPhone: String,

  email: {
    type: String,
    default: '',
    unique: true,
    required: true
  },
  password: {
    type: String,
    default: ''
  },
  employers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

/**
 * Register
 */

mongoose.model('Organization', OrganizationSchema);
