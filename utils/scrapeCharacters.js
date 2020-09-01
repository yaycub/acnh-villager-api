const request = require('superagent');
const cheerio = require('cheerio');

const fandomURL = 'https://imagecomics.fandom.com';
const selecter = '#mw-content-text > table:nth-child(4) > tbody > tr > td > table > tbody > tr';

module.exports = async() => {
  const html = await request.get(`${fandomURL}/wiki/Saga_Wiki`);
  const $ = cheerio.load(html.text);

  const characterLinkArray = [];

  $(selecter).each((index, element) => $(element).find('li').each((_, element) => {
    if($(element).find('a').attr('href')){
      characterLinkArray.push({
        charURL: `${fandomURL}${$(element).find('a').attr('href')}`,
        charName: $(element).find('a').text()
      });
    }
  }));

  return characterLinkArray;
};
