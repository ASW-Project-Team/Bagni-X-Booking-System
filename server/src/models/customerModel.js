const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let customersSchema = new Schema({
  // contacts
  name: String,
  surname: String,
  phone: String,
  address: String,

  // authentication
  email: String,
  hash: String,

  // other values
  // registered is used to discriminate users that corresponds
  // to an account
  registered: {type: Boolean, default: true},
  deleted: {type: Boolean, default: false},
});

const customers = mongoose.model('customers', customersSchema);

module.exports = customers;
