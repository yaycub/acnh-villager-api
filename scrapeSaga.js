const { scrapeAllCharacters } = require('./utils/scrapeCharacters');


scrapeAllCharacters()
  .then(console.log)
  .catch(console.log);
