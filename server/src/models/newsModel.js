const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  article: {type: String, default: null},
  date: Date,
  imageUrl: String,
});

const newsModel = mongoose.model('news', newsSchema);

module.exports = newsModel;
