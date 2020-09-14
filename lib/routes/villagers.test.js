require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const connect = require('../utils/connect');
const mongoose = require('mongoose');

describe('Villager Routes', () => {
  beforeAll(() => connect());

  afterAll(() => mongoose.connection.close());

  it('can get the first 50 villagers', () => {
    return request(app)
      .get('/villagers?perPage=50')
      .then(res => {
        expect(res.body).toHaveLength(50);
      });
  });

  it('can find a villager with name Eugene', () => {
    return request(app)
      .get('/villagers?name=eugene')
      .then(res => {
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          url: 'https://animalcrossing.fandom.com/wiki/Eugene',
          birthday: 'October 26th (Scorpio)',
          coffee: {
            roast: 'Mocha',
            milk: 'No milk',
            sugar: 'No sugar'
          },
          gameAppearances: expect.any(Array),
          gender: 'male',
          goal: 'Guitarist',
          image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/a/ab/Eugene_NH.png/revision/latest?cb=20200802155621',
          japaneseName: 'ロッキー Rokkī',
          name: 'Eugene',
          personality: 'smug',
          phrase: 'yeah buddy',
          quote: 'Imitation is the sincerest form of flattery.',
          skill: 'Rapping',
          song: {
            link: 'https://animalcrossing.fandom.com/wiki/Agent_K.K.',
            name: 'Agent K.K.',
          },
          species: 'koala',
          style: 'Rock\'n\'roll',
          __v: 0
        });
      });
  });

  it('can find all males with query', () => {
    return request(app)
      .get('/villagers?gender=male')
      .then(res => {
        const allMales = res.body.filter(villager => villager.gender === 'male');
        expect(allMales).toHaveLength(25);
        expect(res.body).toHaveLength(25);
      });
  });

  it('can find all villagers that are ducks', () => {
    return request(app)
      .get('/villagers?species=duck&perPage=50')
      .then(res => {
        const allDucks = res.body.filter(villager => villager.species === 'duck');
        expect(allDucks).toHaveLength(17);
        expect(res.body).toHaveLength(17);
      });
  });

  it('can get a villager by id', () => {
    return request(app)
      .get('/villagers/5f5fa52cc2056315bc9df540')
      .then(res => {
        expect(res.body).toEqual({
          _id: '5f5fa52cc2056315bc9df540',
          url: 'https://animalcrossing.fandom.com/wiki/Scoot',
          birthday: 'June 13th (Gemini)',
          coffee: {
            roast: 'Mocha',
            milk: 'The regular amount of milk',
            sugar: 'Two spoonfuls of sugar'
          },
          gameAppearances: expect.any(Array),
          gender: 'male',
          goal: 'Rugby player',
          image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/e/ec/Scoot_NH.png/revision/latest?cb=20200802195542',
          japaneseName: 'マモル Mamoru',
          name: 'Scoot',
          personality: 'jock',
          phrase: 'zip zoom',
          quote: 'Some birds avoid the water; ducks look for it.',
          skill: 'Climbing trees',
          song: {
            link: 'https://animalcrossing.fandom.com/wiki/My_Place',
            name: 'My Place',
          },
          species: 'duck',
          style: 'Sporty',
          __v: 0
        });
      });
  });
});
