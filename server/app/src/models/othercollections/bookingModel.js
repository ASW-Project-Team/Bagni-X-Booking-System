module.exports = function(mongoose) {

    let Service = require('./serviceModel')(mongoose).schema;
    let Float = require('mongoose-float').loadType(mongoose);

    let Schema = mongoose.Schema;


    let Booking = new Schema({
        _id: Schema.Types.ObjectID,
        umbrella_id: Schema.Types.ObjectID,
        confirmed: Boolean,
        cancelled: Boolean,
        price: Float, // fixme price > price min
        date_from: {type: Date, $gte: Date.now()},
        date_to: {type: Date, $gte: Date.now()}, // fixme date_to > date_from
        services: [{type: Service, default: null}]
    });
    return mongoose.model('bookingmodel', Booking, 'bookings');

}