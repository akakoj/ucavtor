/**
 * Organization model
 *
 * @module       :: model
 * @description  :: Represent Organization in database
 *
 *
 * Module dependencies
 */

import { Schema } from 'mongoose';

/**
 * Organization schema
 */

export default new Schema({
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
    required: true,
  },
  password: {
    type: String,
    default: '',
  },
  employers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});
