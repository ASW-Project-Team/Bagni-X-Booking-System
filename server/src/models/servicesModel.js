const mongoose = require('mongoose');
const Float = require("mongoose-float").loadType(mongoose);

const serviceSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectID, required: false },
  name: String,
  description: String,
  imageUrl: String,
  dailyPrice: { type: Float, $gte: 0.0 },
});

const serviceModel = mongoose.model('Service', serviceSchema, 'services');

module.exports = serviceModel;
