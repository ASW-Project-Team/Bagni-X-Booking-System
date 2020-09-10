const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  // contacts
  name: String,
  surname: String,
  phone: String,
  address: String,
  email: String,
  hash: String,
  registered: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
});

const customerModel = mongoose.model('Customer', customerSchema, 'customers');

module.exports = customerModel;
