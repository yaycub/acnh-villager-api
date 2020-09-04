require('dotenv').config();
require('./lib/utils/connect')();
const { scrapeAllCharacters } = require('./scraper/scrapeCharacters');
const Villager = require('./lib/models/Villager');
const mongoose = require('mongoose');

scrapeAllCharacters()
  .then(characters => Villager.create(characters))
  .then(() => console.log('Database Seeded'))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
