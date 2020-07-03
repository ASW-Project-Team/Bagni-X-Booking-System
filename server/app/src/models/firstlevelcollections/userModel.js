module.exports = function(mongoose) {

    const Schema = mongoose.Schema;
    const Float = require('mongoose-float').loadType(mongoose);

    const Service = new Schema({
        _id: Schema.Types.ObjectID,
        price: Float,
        description: {type: String, default: ""}
    });

    const Booking = new Schema({
        _id: Schema.Types.ObjectID,
        umbrella_id: Schema.Types.ObjectID,
        confirmed: Boolean,
        cancelled: Boolean,
        price: Float, // fixme price > price min
        date_from: Date,
        date_to: Date, // fixme date_to > date_from
        services: [Service]
    });
    //import {Booking} from "../othercollections/bookingModel";


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
        bookings: {type: [Booking], default: undefined}
    });
    return mongoose.model('usermodel', UserSchema, 'Users');
};