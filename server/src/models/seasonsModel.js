const mongoose = require('mongoose');
const Float = require("mongoose-float").loadType(mongoose);

const seasonSchema = new mongoose.Schema({
  year: Number, // could be: the global average, if -1; the benchmark, if 0; the season year, otherwise
  data: [{
    date: Date,
    percent: Float
  }]
});

const seasonModel = mongoose.model('Season', seasonSchema, 'seasons');

module.exports = seasonModel;
