let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};

/*  // fixme Google it
schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
*/

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
        username: String,
        email: String,
        salt: String,
        hash: String,

        // other values
        registered: {type: Boolean, default: true}, // used to discriminate users that corresponds to an account
        deleted: {type: Boolean, default: false},
    });
    return mongoose.model('customer', customerSchema, 'customers');
};
