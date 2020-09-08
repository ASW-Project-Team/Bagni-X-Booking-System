let model;

module.exports = function(mongoose) {
  if (!!!model)
    model = initializeModel(mongoose);

  return model;
};


const initializeModel = function(mongoose) {
  let Schema = mongoose.Schema;

  let adminSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    // the root user can create or delete admin users
    // (NB: cannot add other root admins)
    root: {type: Boolean, default: false},
    username: String,
    hash: String
  });
  return mongoose.model('admin', adminSchema, 'admins');
};
