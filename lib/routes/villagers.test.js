require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const connect = require('../utils/connect');
const mongoose = require('mongoose');

describe('Villager Routes', () => {
  beforeAll(() => connect());

  afterAll(() => mongoose.connection.close());

  it('can get the first 25 villagers', () => {
    return request(app)
      .get('/villagers')
      .then(res => {
        expect(res.body).toHaveLength(25);
      });
  });

  it('can find a villager with name Eugene', () => {
    return request(app)
      .get('/villagers?name=Eugene')
      .then(res => {
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          url: 'https://animalcrossing.fandom.com/wiki/Eugene',
          birthday: 'October 26th (Scorpio)',
          coffee: {
            roast: 'Mocha',
            milk: ' No milk',
            sugar: ' No sugar'
          },
          gameAppearances: expect.any(Array),
          gender: 'Male',
          goal: 'Guitarist',
          image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/a/ab/Eugene_NH.png/revision/latest?cb=20200802155621',
          japaneseName: 'ロッキー Rokkī',
          name: 'Eugene',
          personality: 'Smug',
          phrase: 'yeah buddy',
          quote: 'Imitation is the sincerest form of flattery.',
          skill: 'Rapping',
          song: {
            link: 'https://animalcrossing.fandom.com/wiki/Agent_K.K.',
            name: 'Agent K.K.',
          },
          species: 'Koala',
          style: 'Rock\'n\'roll',
          __v: 0
        });
      });
  });

  it('can find all males with query', () => {
    return request(app)
      .get('/villagers?gender=Male')
      .then(res => {
        const allMales = res.body.filter(villager => villager.gender === 'Male');
        expect(allMales).toHaveLength(25);
      });
  });
});
