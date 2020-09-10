const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  // contacts
  name: String,
  surname: String,
  phone: String,
  address: String,

  // authentication
  email: String,
  hash: String,

  // other values
  // 'registered' is used to discriminate users that corresponds to an account
  registered: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
});

const customerModel = mongoose.model('Customer', customerSchema, 'customers');

module.exports = customerModel;
