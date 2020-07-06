let collection;

module.exports = function(mongoose) {
    if (!!!collection)
        collection = initializeCollection();

    return collection;
};


const initializeCollection = function() {
    let Schema = mongoose.Schema;
    let bookingModel = require('./nestedSchemas/bookingModel')

    // it's possible also nested declaration?
    let UserSchema = new Schema({
        _id: mongoose.Types.ObjectId,
        name: String, // String is shorthand for {type: String}
        surname: String,
        phone: String, // fixme add validator from server
        email: String, // fixme add validator from server
        address: String,
        registered: Boolean,
        deleted: {type: Boolean, default: false},
        bookings: [{type: bookingModel.schema(), default: null}]
    });
    return mongoose.model('usermodel', UserSchema, 'users');
};
