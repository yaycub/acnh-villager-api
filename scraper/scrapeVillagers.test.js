const { scrapeVillagerData } = require('./scrapeVillagers');

describe('scrapeVillagerData', () => {
  it('should parse Agent S', () => {
    return scrapeVillagerData('https://animalcrossing.fandom.com/wiki/Agent_S')
      .then(character => {
        expect(character).toEqual({
          url: 'https://animalcrossing.fandom.com/wiki/Agent_S',
          birthday: 'July 2nd (Cancer)',
          coffee: {
            roast: 'Mocha',
            milk: 'The regular amount of milk',
            sugar: 'Two spoonfuls of sugar'
          },
          gender: 'female',
          goal: 'Dancer',
          image: 'https://static.wikia.nocookie.net/animalcrossing/images/a/a7/Agent_S_NH.png/revision/latest?cb=20200719092526',
          japaneseName: '2ごう Ni Gō',
          name: 'Agent S',
          personality: 'peppy',
          quote: 'You gotta put the pedal to the metal!',
          skill: 'Limboing',
          song: {
            link: 'n/a',
            name: 'n/a',
          },
          species: 'squirrel',
          style: 'n/a'
        });
      });
  });

  it('should parse Canberra', () => {
    return scrapeVillagerData('https://animalcrossing.fandom.com/wiki/Canberra')
      .then(character => {
        expect(character).toEqual({
          url: 'https://animalcrossing.fandom.com/wiki/Canberra',
          birthday: 'May 14th (Taurus)',
          coffee: {
            roast: 'Kilimanjaro',
            milk: 'Lots of milk',
            sugar: 'Three spoonfuls of sugar'
          },
          gender: 'female',
          goal: 'Tennis Player',
          image: 'https://static.wikia.nocookie.net/animalcrossing/images/e/e6/Canberra_NH.png/revision/latest?cb=20200817200518',
          japaneseName: 'キャンベラ Kyanbera',
          name: 'Canberra',
          personality: 'sisterly',
          quote: 'It\'s never too late to start over.',
          skill: 'Making faces',
          song: {
            link: 'n/a',
            name: 'n/a',
          },
          species: 'koala',
          style: 'n/a'
        });
      });
  });

  it('should parse Admiral', () => {
    return scrapeVillagerData('https://animalcrossing.fandom.com/wiki/Admiral')
      .then(character => {
        expect(character).toEqual({
          url: 'https://animalcrossing.fandom.com/wiki/Admiral',
          birthday: 'January 27th (Aquarius)',
          coffee: {
            roast: 'Blue Mountain',
            milk: 'The regular amount of milk',
            sugar: '2 spoonfuls of sugar'
          },
          gender: 'male',
          goal: 'Fisherman',
          image: 'https://static.wikia.nocookie.net/animalcrossing/images/e/ed/Admiral_NH.png/revision/latest?cb=20200802081138',
          japaneseName: 'イッテツ Ittetsu',
          name: 'Admiral',
          personality: 'cranky',
          quote: 'Only quitters give up.',
          skill: 'Writing about pickles',
          song: {
            link: 'https://animalcrossing.fandom.com/wiki/Steep_Hill',
            name: 'Steep Hill',
          },
          species: 'bird',
          style: 'n/a'
        });
      });
  });
});
