const request = require('superagent');
const cheerio = require('cheerio');

const fandomURL = 'https://animalcrossing.fandom.com';
const selecter = '#mw-content-text > table:nth-child(5) > tbody > tr:nth-child(2) > td > table > tbody';

const scrapeCharLinks = async() => {
  const html = await request.get(`${fandomURL}/wiki/Villager_list_(New_Horizons)`);
  const $ = cheerio.load(html.text);

  const characterLinkArray = [];

  $(selecter).each((_, element) => $(element).find('tr').each((_, element) => {
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

// const relatives = $('#mw-content-text > div:nth-child(2) > div:nth-child(4) > div:nth-child(2)').text().trim().replace(',', '').split(')');

module.exports = async() => {
  return scrapeCharLinks();
};
