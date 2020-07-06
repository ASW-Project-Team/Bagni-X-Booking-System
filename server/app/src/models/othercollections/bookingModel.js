module.exports = function(mongoose) {

    let Float = require("mongoose-float").loadType(mongoose);

    let Schema = mongoose.Schema;

    let BookingSchema = new Schema({
        _id: Schema.Types.ObjectID,
        umbrella_id: Schema.Types.ObjectID,
        confirmed: {type: Boolean, default: false},
        cancelled: {type: Boolean, default: false},
        price: { type: Float, $gt: 0.0 }, // fixme price > price min
        date_from: {type: Date, $gte: Date.now()}, // fixme $gte not correct
        date_to: {type: Date, $gte: Date.now()}, // fixme date_to > date_from
        services: [{type: new Schema({
                _id: Schema.Types.ObjectID,
                price: Float,
                description: {type: String, default: null}
            }), default: null}]
    });

    return mongoose.model('bookingmodel', BookingSchema, 'bookings');

}

