const scrapeCharacters = require('./utils/scrapeCharacters');

scrapeCharacters()
  .then(console.log)
  .catch(console.log);
