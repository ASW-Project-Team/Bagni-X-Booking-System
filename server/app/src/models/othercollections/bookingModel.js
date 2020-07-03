module.exports = function(mongoose) {

    const Service = require('./serviceModel');
//import {Service} from "./serviceModel";

    const Schema = mongoose.Schema;


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
    return mongoose.model('bookingmodel', BookingSchema, 'bookings');

}