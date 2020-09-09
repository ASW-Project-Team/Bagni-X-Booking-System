const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let adminsSchema = new Schema({
  // the root user can create or delete admin users
  // (NB: cannot add other root admins)
  root: {type: Boolean, default: false},
  username: String,
  hash: String
});

const admins = mongoose.model('admins', adminsSchema);

module.exports = admins;
