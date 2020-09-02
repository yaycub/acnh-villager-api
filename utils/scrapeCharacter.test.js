const { scrapeCharacterData } = require('./scrapeCharacters');

describe('scrapeCharacterData', () => {
  it('should parse Agent S', () => {
    return scrapeCharacterData('https://animalcrossing.fandom.com/wiki/Agent_S')
      .then(character => {
        expect(character).toEqual({
          birthday: 'July 2nd (Cancer)',
          coffee: expect.any(Array),
          gameAppearances: expect.any(Array),
          gender: 'Female',
          goal: 'Dancer',
          image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/a/a7/Agent_S_NH.png/revision/latest?cb=20200719092526',
          japaneseName: '2ごう Ni Gō',
          name: 'Agent S',
          personality: 'Peppy',
          phrase: 'sidekick',
          quote: 'You gotta put the pedal to the metal!',
          skill: 'Limboing',
          song: {
            link: 'https://animalcrossing.fandom.com/wiki/Go_K.K._Rider',
            name: 'Go K.K. Rider',
          },
          species: 'Squirrel',
          style: 'Sporty'
        });
      });
  });

  it('should parse Canberra', () => {
    return scrapeCharacterData('https://animalcrossing.fandom.com/wiki/Canberra')
      .then(character => {
        expect(character).toEqual({
          birthday: 'May 14th (Taurus)',
          coffee: expect.any(Array),
          gameAppearances: expect.any(Array),
          gender: 'Female',
          goal: 'Tennis Player',
          image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/e/e6/Canberra_NH.png/revision/latest?cb=20200817200518',
          japaneseName: 'キャンベラ Kyanbera',
          name: 'Canberra',
          personality: 'Sisterly',
          phrase: 'nuh uh',
          quote: 'It\'s never too late to start over.',
          skill: 'Making Faces',
          song: {
            link: 'https://animalcrossing.fandom.com/wiki/K.K._Island',
            name: 'K.K. Island',
          },
          species: 'Koala',
          style: 'Sporty'
        });
      });
  });

  it('should parse Admiral', () => {
    return scrapeCharacterData('https://animalcrossing.fandom.com/wiki/Admiral')
      .then(character => {
        expect(character).toEqual({
          birthday: 'January 27th (Aquarius)',
          coffee: expect.any(Array),
          gameAppearances: expect.any(Array),
          gender: 'Male',
          goal: 'Fisherman',
          image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/e/ed/Admiral_NH.png/revision/latest?cb=20200802081138',
          japaneseName: 'イッテツ Ittetsu',
          name: 'Admiral',
          personality: 'Cranky',
          phrase: 'aye aye',
          quote: 'Only quitters give up.',
          skill: 'Writing about pickles',
          song: {
            link: 'https://animalcrossing.fandom.com/wiki/Steep_Hill',
            name: 'Steep Hill',
          },
          species: 'Bird',
          style: 'n/a'
        });
      });
  });
});
