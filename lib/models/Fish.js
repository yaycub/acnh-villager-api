const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  japaneseName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  prices: {
    required: true
  },
  size: {
    type: String,
    required: true
  },
  seasonality: {
    type: String,
    required: true
  },
  timeOfDay: {
    type: String,
    required: true
  },
  rarity: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Fish', schema);
