const request = require('superagent');
const cheerio = require('cheerio');

const fandomURL = 'https://animalcrossing.fandom.com';
const charLinkSelector = '#mw-content-text > table:nth-child(5) > tbody > tr:nth-child(2) > td > table > tbody';
const charDataSelector = '#mw-content-text > aside';

const scrapeCharLinks = async() => {
  const html = await request.get(`${fandomURL}/wiki/Villager_list_(New_Horizons)`).retry(3);
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

const scrapeCharacterData = async(text) => {
  try {
    // const html = await request.get(url).retry(3);
    const $ = (args) => cheerio.load(text)(charDataSelector).find(args); 
  
    return {
      name: $('h2[data-source="name"]').text(),
      japaneseName: $('h2[data-source="jname"]').text(),
      image: $('figure > a').attr('href'),
      quote: $('figure > figcaption').text().replace(/([”“])/g, ''),
      gender: $('div[data-source="Gender"] > div').text(),
      personality: $('div[data-source="Personality"] > div').text(),
      species: $('div[data-source="Species"] > div').text(),
      birthday: $('div[data-source="Birthday"] > div').text(),
      phrase: $('section > div > div').text().split('<')[0].trim(),
      skill: $('section > div[data-source="Skill"] > div').text(),
      goal: $('section > div[data-source="Goal"] > div').text(),
      coffee: $('div[data-source="Coffee"] > div').text().replace(/([”“])/g, '').split(','),
      song: {
        name: $('div[data-source="Song"] > div > a').text(),
        link: `${fandomURL}${$('div[data-source="Song"] > div>  a').attr('href')}`
      },
      gameAppearances: $('div[data-source="Games"] > div').text().split(',').map(item => item.trim()),
      style: $('div[data-source="Style"] > div').text() ? $('div[data-source="Style"] > div').text() : 'n/a'
    };
  }
  catch(err){
    return err;
  }
  
};

const scrapeAllCharacters = async() => {
  const charLinks = await scrapeCharLinks();

  return Promise.all(charLinks.map(({ charURL }) => request.get(charURL)))
    .then(arrOfCharacters => Promise.all(arrOfCharacters.map(({ text }) => scrapeCharacterData(text))));
};

module.exports = {
  scrapeCharacterData,
  scrapeAllCharacters
};
