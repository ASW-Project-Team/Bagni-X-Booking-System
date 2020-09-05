let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const Float = require('mongoose-float').loadType(mongoose);
    const serviceModel = require("./nestedSchemas/serviceModel")(mongoose).schema;
    const umbrellaModel = require("./nestedSchemas/umbrellaModel")(mongoose).schema;
    const Schema = mongoose.Schema;
    const bookingSchema = new Schema({
        _id: Schema.Types.ObjectID,
        userId: Schema.Types.ObjectID,
        umbrellas: [umbrellaModel],
        confirmed: {type: Boolean, default: false},
        cancelled: {type: Boolean, default: false},
        price: {type: Float, $gt: 0.0},
        dateFrom: {type: Date, $gte: Date.now()},
        dateTo: {type: Date, $gte: Date.now()},
        services: [{type: serviceModel, default: null}]
    });

    return mongoose.model('booking', bookingSchema, 'bookings');
}
