const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  // the root user can create or delete admin users
  // (NB: cannot add other root admins)
  root: {type: Boolean, default: false},
  username: String,
  hash: String
});

const adminsModel = mongoose.model('admins', adminSchema);

module.exports = adminsModel;
