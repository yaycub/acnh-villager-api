const request = require('superagent');
const cheerio = require('cheerio');

const fandomURL = 'https://animalcrossing.fandom.com';
const fishLinkSelector = '#mw-content-text > div';
// const villagerDataSelector = '#mw-content-text > aside';

const scrapeFishLinks = async() => {
  const html = await request.get(`${fandomURL}/wiki/Fish_(New_Horizons)`).retry(3);
  const $ = cheerio.load(html.text);

  const fishLinkArray = [];

  $(fishLinkSelector).find('tr').each((_, element) => {
    const fishLink = $(element).find('a').attr('href');

    if(fishLink) fishLinkArray.push(`${fandomURL}${fishLink}`);
  });

  return fishLinkArray.splice(1, fishLinkArray.length).reduce((acc, curr) => {
    if(acc.includes(curr)) return acc;
    acc.push(curr);

    return acc;
  }, []);
};

scrapeFishLinks()
  .then(console.log);
