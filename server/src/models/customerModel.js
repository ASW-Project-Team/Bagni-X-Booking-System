let model;

module.exports = function(mongoose) {
  if (!!!model)
    model = initializeModel(mongoose);

  return model;
};

const initializeModel = function(mongoose) {
  let Schema = mongoose.Schema;

  // it's possible also nested declaration?
  let customerSchema = new Schema({
    _id: mongoose.Types.ObjectId,

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
  return mongoose.model('customer', customerSchema, 'customers');
};
