const request = require('superagent');
const cheerio = require('cheerio');

const fandomURL = 'https://animalcrossing.fandom.com';
const charLinkSelector = '#mw-content-text > table:nth-child(5) > tbody > tr:nth-child(2) > td > table > tbody';
const charDataSelector = '#mw-content-text > aside';

const scrapeCharLinks = async() => {
  const html = await request.get(`${fandomURL}/wiki/Villager_list_(New_Horizons)`);
  const $ = cheerio.load(html.text);

  const characterLinkArray = [];

  $(charLinkSelector).each((_, element) => $(element).find('tr').each((_, element) => {
    const charLink = $(element).find('a').attr('href');

    if(charLink){
      characterLinkArray.push({
        charURL: `${fandomURL}${charLink}`,
        charName: $(element).find('a').text().split('<')[0]
      });
    }
  }));

  return characterLinkArray.slice(1, characterLinkArray.length);
};

const scrapeCharacterData = async() => {
  const html = await request.get('https://animalcrossing.fandom.com/wiki/Admiral');
  const $ = cheerio.load(html.text);

  const name = $(charDataSelector).find('h2[data-source="name"]').text();
  const japaneseName = $(charDataSelector).find('h2[data-source="jname"]').text();
  const image = $(charDataSelector).find('figure > a').attr('href');
  const quote = $(charDataSelector).find('figure > figcaption').text().replace(/([”“])/g, '');

  return {
    name,
    japaneseName,
    image,
    quote
  };
};

module.exports = async() => {
  return scrapeCharacterData();
};
