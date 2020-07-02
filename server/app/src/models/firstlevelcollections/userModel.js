import {Booking} from "../othercollections/bookingModel";

module.exports = function(mongoose) {
    const Schema = mongoose.Schema;

    // it's possible also nested declaration?
    const UserSchema = new Schema({
        _id: Schema.Types.ObjectId,
        name: String, // String is shorthand for {type: String}
        surname: String,
        phone: String, // fixme add validator from server
        email: String, // fixme add validator from server
        address: String,
        registered: Boolean,
        deleted: {type: Boolean, default: false},
        bookings: [Booking]
    });
    return mongoose.model('usermodel', UserSchema, 'users');
};