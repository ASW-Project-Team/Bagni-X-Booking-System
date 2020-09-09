const mongoose = require('mongoose');
const Float = require("mongoose-float").loadType(mongoose);
const saleSchema = require('./nestedSchemas/saleModel')(mongoose).schema;

const rankUmbrellasSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  description: { type: String, default: null },
  dailyPrice: Float,
  fromUmbrella: Number,
  toUmbrella: Number,
  sales: [ { type: saleSchema, default: null } ]
});

const rankUmbrellas = mongoose.model('rankUmbrellas', rankUmbrellasSchema);

module.exports = rankUmbrellas;
