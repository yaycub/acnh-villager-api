const request = require('superagent');
const cheerio = require('cheerio');

const fandomURL = 'https://animalcrossing.fandom.com';
const fishLinkSelector = '#mw-content-text > div';
const fishDataSelector = '#mw-content-text > aside';

const locationIndex = {
  river: 'river',
  riverholding: 'river',
  pond: 'pond',
  holding: 'pond',
  riverriver: 'river',
  waterfallriver: 'waterfall',
  ocean: 'ocean',
  oceanisland: 'ocean',
  'ocean, island': 'ocean',
  sea: 'ocean',
  oceantortimer: 'ocean',
  oceantropical: 'ocean',
  island: 'ocean',
  pier: 'pier',
  'tropical sea (new leaf)sea (pier) (new horizons)': 'ocean'
};

const scrapeFishLinks = async() => {
  const { text } = await request.get(`${fandomURL}/wiki/Fish_(New_Horizons)`).retry(3);
  const $ = cheerio.load(text);
  const fishLinkArray = [];

  $(fishLinkSelector).find('tr').each((_, element) => {
    const fishLink = $(element).find('a').attr('href');

    if(fishLink) fishLinkArray.push(`${fandomURL}${fishLink}`);
  });

  return fishLinkArray.reduce((acc, curr) => {
    if(acc.includes(curr)) return acc;
    acc.push(curr);

    return acc;
  }, []);
};

const scrapeFishData = async(url) => {
  const { text } = await request.get(url).retry(3);
  if(!text) return;

  const $ = (dataSelector) => cheerio.load(text)(fishDataSelector).find(dataSelector);
  if(!$('h2[data-source="name"]').text()) return;

  return {
    url,
    name: $('h2[data-source="name"]').text(),
    japaneseName: $('h2[data-source="jname"]').text() || 'n/a',
    location: locationIndex[$('div[data-source="location"] > div').text().toLowerCase()] || locationIndex[$('div[data-source="location"] > a').text().toLowerCase().split(' ')[0]]
  };
};

scrapeFishLinks()
  .then(fishLinks => Promise.all(fishLinks.map(link => scrapeFishData(link))))
  .then(dataMap => dataMap.filter(item => item))
  .then(console.log);
