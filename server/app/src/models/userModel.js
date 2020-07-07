let model;

module.export = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    let Schema = mongoose.Schema;
    let bookingModel = require('./bookingModel')

    // it's possible also nested declaration?
    let userSchema = new Schema({
        _id: mongoose.Types.ObjectId,
        name: String, // String is shorthand for {type: String}
        surname: String,
        phone: String, // fixme add validator from server
        email: String, // fixme add validator from server
        address: String,
        registered: Boolean,
        admin: {type: Boolean, default: false},
        deleted: {type: Boolean, default: false},
    });
    return mongoose.model('user', userSchema, 'users');
};
