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
        name: String,
        surname: String,
        phone: {type: String, default: null}, // fixme add validator from server
        email: String, // fixme add validator from server
        address: {type: String, default: null},
        registered: {type: Boolean, default: true},
        //admin: {type: Boolean, default: false},
        deleted: {type: Boolean, default: false},
    });
    return mongoose.model('user', userSchema, 'users');
};
