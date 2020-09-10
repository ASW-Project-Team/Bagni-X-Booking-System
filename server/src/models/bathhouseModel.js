const mongoose = require('mongoose');

const bathhouseSchema = new mongoose.Schema(
  {
    name: String,
    logoUrl: String,
    seasonStart: Date,
    seasonEnd: Date
  },
  // forces the collection to have a maximum of 1 element
  { capped: { max: 1, size: 1024, autoIndexId: true } }
);

const bathhouseModel = mongoose.model('Bathhouse', bathhouseSchema, 'bathhouse');

module.exports = bathhouseModel;
