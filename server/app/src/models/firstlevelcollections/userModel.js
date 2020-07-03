module.exports = function(mongoose) {

    const Schema = mongoose.Schema;


    let Booking = require("../othercollections/bookingModel")(mongoose).schema;


    // it's possible also nested declaration?
    const UserSchema = new Schema({
        _id: mongoose.Types.ObjectId,
        name: String, // String is shorthand for {type: String}
        surname: String,
        phone: String, // fixme add validator from server
        email: String, // fixme add validator from server
        address: String,
        registered: Boolean,
        deleted: {type: Boolean, default: false},
        bookings: [{type: Booking, default: null}]
    });
    return mongoose.model('usermodel', UserSchema, 'users');
};