require('dotenv').config();
require('./lib/utils/connect')();
const { scrapeAllCharacters } = require('./scraper/scrapeCharacters');
const Villager = require('./lib/models/Villager');
const mongoose = require('mongoose');

scrapeAllCharacters()
  .then(characters => Villager.create(characters))
  .then(console.log)
  .catch(console.log)
  .finally(() => mongoose.connection.close());
