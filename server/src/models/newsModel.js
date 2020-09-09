const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let newsSchema = new Schema({
  title: String,
  article: {type: String, default: null},
  date: Date,
  imageUrl: String,
});

const news = mongoose.model('news', newsSchema);

module.exports = news;
