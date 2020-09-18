const mongoose = require('mongoose');

const bathhouseSchema = new mongoose.Schema({
    name: String,
    logoUrl: String,
    seasonStart: Date,
    seasonEnd: Date
});

const bathhouseModel = mongoose.model('Bathhouse', bathhouseSchema, 'bathhouse');

module.exports = bathhouseModel;
