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

const scrapeCharacterData = async(url) => {
  const html = await request.get(url);
  const $ = (args) => cheerio.load(html.text)(charDataSelector).find(args); 

  const name = $('h2[data-source="name"]').text();
  const japaneseName = $('h2[data-source="jname"]').text();
  const image = $('figure > a').attr('href');
  const quote = $('figure > figcaption').text().replace(/([”“])/g, '');
  const gender = $('div[data-source="Gender"] > div').text();
  const personality = $('div[data-source="Personality"] > div').text();
  const species = $('div[data-source="Species"] > div').text();
  const birthday = $('div[data-source="Birthday"] > div').text();
  const phrase = $('section > div > div').text().split('<')[0];
  const skill = $('section > div[data-source="Skill"] > div').text();
  const goal = $('section > div[data-source="Goal"] > div').text();
  const coffee = $('div[data-source="Coffee"] > div').text().replace(/([”“])/g, '').split(',');
  const song = {
    name: $('div[data-source="Song"] > div > a').text(),
    link: `${fandomURL}${$('div[data-source="Song"] > div>  a').attr('href')}`
  };
  const gameAppearances = $('div[data-source="Games"] > div').text().split(',');

  return {
    name,
    japaneseName,
    image,
    quote,
    gender,
    personality,
    species,
    birthday,
    phrase,
    skill,
    goal,
    coffee,
    song,
    gameAppearances
  };
};

module.exports = {
  scrapeCharacterData
};
