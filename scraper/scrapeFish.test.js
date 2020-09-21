const { scrapeFishData } = require('./scrapeFish');

describe('scrapeFishData', () => {
  it('should parse a Bitterling', () => {
    return scrapeFishData('https://animalcrossing.fandom.com/wiki/Bitterling')
      .then(fish => {
        expect(fish).toEqual({
          url: 'https://animalcrossing.fandom.com/wiki/Bitterling',
          name: 'Bitterling',
          japaneseName: 'タナゴ Tanago',
          location: 'river',
          prices: { nook: 900, cj: 1350 },
          size: 'tiny',
          seasonality: 'November to March',
          timeOfDay: 'all day',
          rarity: 'common'
        });
      });
  });

  it('should parse a Betta', () => {
    return scrapeFishData('https://animalcrossing.fandom.com/wiki/Betta')
      .then(fish => {
        expect(fish).toEqual({
          url: 'https://animalcrossing.fandom.com/wiki/Betta',
          name: 'Betta',
          japaneseName: 'n/a',
          location: 'river',
          prices: { 
            nook: 2500, 
            cj: 3750 
          },
          size: 'small',
          seasonality: 'May to October',
          timeOfDay: '9am - 4pm',
          rarity: 'uncommon'
        });
      });
  });

  it('should parse a Tuna', () => {
    return scrapeFishData('https://animalcrossing.fandom.com/wiki/Tuna')
      .then(fish => {
        expect(fish).toEqual({
          url: 'https://animalcrossing.fandom.com/wiki/Tuna',
          name: 'Tuna',
          japaneseName: 'マグロ Maguro',
          location: 'pier',
          prices: { 
            nook: 7000, 
            cj: 10500 
          },
          size: 'huge',
          seasonality: 'November to April',
          timeOfDay: 'all day',
          rarity: 'scarce'
        });
      });
  });

  it('should parse a Sea Butterfly', () => {
    return scrapeFishData('https://animalcrossing.fandom.com/wiki/Sea_butterfly')
      .then(fish => {
        expect(fish).toEqual({
          url: 'https://animalcrossing.fandom.com/wiki/Sea_butterfly',
          name: 'Sea butterfly',
          japaneseName: 'クリオネ Kurione',
          location: 'ocean',
          prices: { 
            nook: 1000, 
            cj: 'n/a' 
          },
          size: 'tiny',
          seasonality: 'December to March',
          timeOfDay: 'all day',
          rarity: 'uncommon'
        });
      });
  });

  it('should parse a Hammerhead shark', () => {
    return scrapeFishData('https://animalcrossing.fandom.com/wiki/Hammerhead_shark')
      .then(fish => {
        expect(fish).toEqual({
          url: 'https://animalcrossing.fandom.com/wiki/Hammerhead_shark',
          name: 'Hammerhead shark',
          japaneseName: 'シュモクザメ Shumokuzame',
          location: 'ocean',
          prices: { 
            nook: 8000, 
            cj: 'n/a' 
          },
          size: 'huge (with fin)',
          seasonality: 'June to September',
          timeOfDay: '4pm to 9am',
          rarity: 'scarce'
        });
      });
  });
});
