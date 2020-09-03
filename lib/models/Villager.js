const mongoose = require('mongoose');

const coffeeSchema = new mongoose.Schema({
  roast: {
    type: String,
    required: true
  },
  milk: {
    type: String,
    required: true
  },
  sugar: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  _id: false
});

const songSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  _id: false
});

const schema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  coffee: coffeeSchema,
  gameAppearances: {
    type: Array,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  goal: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  japaneseName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  personality: {
    type: String,
    required: true
  },
  phrase: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  skill: {
    type: String,
    required: true
  },
  song: songSchema,
  species: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Villager', schema);
