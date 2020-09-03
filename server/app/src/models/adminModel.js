let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    let Schema = mongoose.Schema;

    // it's possible also nested declaration?
    let adminSchema = new Schema({
        _id: mongoose.Types.ObjectId,
        root: {type: Boolean, default: false}, // the root user can create or delete admin users (NB: cannot add other root admins)

        // authentication
        username: String, // TODO add validator from server
        salt:String,
        hashedPassword: String
    });
    return mongoose.model('admin', adminSchema, 'admins');
};
