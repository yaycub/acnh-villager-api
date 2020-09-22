require('dotenv').config();
require('./lib/utils/connect')();
const mongoose = require('mongoose');
const Fish = require('./lib/models/Fish');
const { scrapeAllFish } = require('./scraper/scrapeFish');

scrapeAllFish()
  .then(fish => Fish.create(fish))
  .then(() => console.log('Database Seeded'))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
