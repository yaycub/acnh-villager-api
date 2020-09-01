const request = require('superagent');
const cheerio = require('cheerio');

const fandomURL = 'https://imagecomics.fandom.com';
const selecter = '#mw-content-text > table:nth-child(4) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > ul > li';

module.exports = async() => {
  const html = await request.get(`${fandomURL}/wiki/Saga_Wiki`);
  const $ = cheerio.load(html.text);

  const arr = [];

  $(selecter).each((index, element) => arr.push({
    charURL: `${fandomURL}${$(element).find('a').attr('href')}`,
    charName: $(element).find('a').text()
  }));

  return arr;
};

//#mw-content-text > table:nth-child(4) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > ul > li:nth-child(1) > a
