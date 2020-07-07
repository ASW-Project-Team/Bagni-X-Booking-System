let model;

module.export = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const Float = require('mongoose-float').loadType(mongoose);
    const serviceModel = require('server/app/src/models/nestedSchemas/serviceModel')
    const Schema = mongoose.Schema;
    const bookingSchema = new Schema({
        _id: Schema.Types.ObjectID,
        user_id: Schema.Types.ObjectID,
        umbrella_id: Schema.Types.ObjectID,
        confirmed: {type: Boolean, default: false},
        cancelled: {type: Boolean, default: false},
        price: {type: Float, $gt: 0.0}, // fixme price > price min
        date_from: {type: Date, $gte: Date.now()}, // fixme $gte not correct
        date_to: {type: Date, $gte: Date.now()}, // fixme date_to > date_from
        services: [{type: serviceModel, default: null}]
    });

    return mongoose.model('booking', bookingSchema, 'bookings');
}

