const request = require('superagent');
const cheerio = require('cheerio');

const fandomURL = 'https://animalcrossing.fandom.com';
const villagerLinkSelector = '#mw-content-text > table:nth-child(5) > tbody > tr:nth-child(2) > td > table > tbody';
const villagerDataSelector = '#mw-content-text > aside';

const scrapeVillagerLinks = async() => {
  const html = await request.get(`${fandomURL}/wiki/Villager_list_(New_Horizons)`).retry(3);
  const $ = cheerio.load(html.text);

  const villagerLinkArray = [];

  $(villagerLinkSelector).each((_, element) => $(element).find('tr').each((_, element) => {
    const charLink = $(element).find('a').attr('href');
    if(charLink) villagerLinkArray.push(`${fandomURL}${charLink}`);
  }));

  return villagerLinkArray.slice(1, villagerLinkArray.length);
};

const scrapeVillagerData = async(url) => {
  const { text } = await request.get(url).retry(3);
  const $ = (args) => cheerio.load(text)(villagerDataSelector).find(args); 
    
  const brewCoffee = () => {
    const [roast, milk, sugar] = $('div[data-source="Coffee"] > div').text().replace(/([”“])/g, '').split(',');
    return { 
      roast: roast ? roast.trim() : 'n/a',
      milk: milk ? milk.trim() : 'n/a', 
      sugar: sugar ? sugar.trim() : 'n/a'
    };
  };

  const writeSong = () => {
    const song = $('div[data-source="Song"] > div > a');
    return { 
      name: song.text() || 'n/a', 
      link: song.attr('href') ? `${fandomURL}${song.attr('href')}` : 'n/a'
    };
  };
  
  return {
    url,
    name: $('h2[data-source="name"]').text(),
    japaneseName: $('h2[data-source="jname"]').text() || 'n/a',
    image: $('figure[data-source="image"] > a').attr('href'),
    quote: $('figure[data-source="image"] > figcaption').text().replace(/([”“"])/g, '') || 'n/a',
    gender: $('div[data-source="Gender"] > div').text().toLowerCase(),
    personality: $('div[data-source="Personality"] > div').text().toLowerCase(),
    species: $('div[data-source="Species"] > div').text().toLowerCase(),
    birthday: $('div[data-source="Birthday"] > div').text(),
    phrase: $('section > div[data-source="Initial Phrase"] > div').text().split('<')[0].trim() || 'n/a',
    skill: $('section > div[data-source="Skill"] > div').text() || 'n/a',
    goal: $('section > div[data-source="Goal"] > div').text() || 'n/a',
    coffee: brewCoffee(),
    song: writeSong(),
    style: $('div[data-source="Style"] > div').text() || 'n/a'
  };
};

const scrapeAllVillagers = () => {
  return scrapeVillagerLinks()
    .then(charLinks => Promise.all(charLinks.map(url => scrapeVillagerData(url))));
};

module.exports = {
  scrapeVillagerData,
  scrapeAllVillagers
};
