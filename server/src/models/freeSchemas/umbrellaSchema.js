const mongoose = require('mongoose')
const rankUmbrellaSchema = require('../rankUmbrellasModel').schema;

const umbrellaSchema = new mongoose.Schema({
  number: Number,
  rankUmbrella: rankUmbrellaSchema,
})

module.exports = umbrellaSchema;
