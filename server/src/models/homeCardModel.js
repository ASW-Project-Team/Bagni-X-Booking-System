const mongoose = require('mongoose');

const homeCardSchema = new mongoose.Schema({
    imageUrl: String,
    title: String,
    description: String,
    isMainCard: Boolean,
    orderingIndex: Number
});

const homeCardModel = mongoose.model('HomeCard', homeCardSchema, 'homeCards');

module.exports = homeCardModel;
