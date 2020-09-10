const mongoose = require('mongoose');
const Float = require("mongoose-float").loadType(mongoose);
const saleSchema = require('./freeSchemas/saleSchema');

const rankUmbrellasSchema = new mongoose.Schema({
  rankUmbrellaId: { type: mongoose.Schema.Types.ObjectID, required: false },
  name: String,
  imageUrl: String,
  description: { type: String, default: null },
  dailyPrice: Float,
  fromUmbrella: Number,
  toUmbrella: Number,
  sales: [ { type: saleSchema, default: null } ]
});

const rankUmbrellaModel = mongoose.model('RankUmbrella', rankUmbrellasSchema, 'rankUmbrellas');

module.exports = rankUmbrellaModel;
