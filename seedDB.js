require('dotenv').config();
require('./lib/utils/connect')();
const { scrapeAllVillagers } = require('./scraper/scrapeVillagers');
const Villager = require('./lib/models/Villager');
const mongoose = require('mongoose');

scrapeAllVillagers()
  .then(characters => Villager.create(characters))
  .then(() => console.log('Database Seeded'))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
