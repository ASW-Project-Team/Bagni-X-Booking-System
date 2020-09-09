const mongoose = require('mongoose')
const Float = require("mongoose-float").loadType(mongoose);

const saleSchema = new mongoose.Schema({
  percent: { type: Float, },
  dateFrom: { type: Date, $gte: Date.now() },
  dateTo: { type: Date, $gte: Date.now() },
})

module.exports = saleSchema;
