let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    let Schema = mongoose.Schema;

    // it's possible also nested declaration?
    let userSchema = new Schema({
        _id: mongoose.Types.ObjectId,

        // contacts
        name: String,
        surname: String,
        phone: {type: String, default: null}, // fixme add validator from server
        address: {type: String, default: null},

        // authentication
        email: String, // used for authentication  // fixme add validator from server
        salt: { type: String, default: null },
        hashedPassword: {type: String, default: null},

        // other values
        registered: {type: Boolean, default: true}, // used to discriminate users that corresponds to an account
        deleted: {type: Boolean, default: false},
    });
    return mongoose.model('user', userSchema, 'users');
};
