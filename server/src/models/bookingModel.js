const mongoose = require('mongoose')
const umbrellaSchema = require('./freeSchemas/umbrellaSchema');
const Float = require("mongoose-float").loadType(mongoose);
const serviceSchema = require('./servicesModel').schema;

const bookingSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectID,
    umbrellas: [ umbrellaSchema ],
    confirmed: {type: Boolean, default: false},
    cancelled: {type: Boolean, default: false},
    price: {type: Float, $gt: 0.0},
    dateFrom: {type: Date, $gte: Date.now()},
    dateTo: {type: Date, $gte: Date.now()},
    services: [ serviceSchema ]
});

const bookingModel = mongoose.model('Booking', bookingSchema, 'bookings');

module.exports = bookingModel;
