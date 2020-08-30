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
        phone: {type: String, default: null},
        address: {type: String, default: null},

        // authentication
        email: String,
        salt: String,
        hashedPassword: String,

        // other values
        registered: {type: Boolean, default: true}, // used to discriminate users that corresponds to an account
        deleted: {type: Boolean, default: false},
    });
    return mongoose.model('customer', customerSchema, 'customers');
};
