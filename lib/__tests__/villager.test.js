import dotenv from 'dotenv';
dotenv.config();

import { MongoMemoryServer } from 'mongodb-memory-server';

import app from '../app.js';
import request from 'supertest';
const mongod = new MongoMemoryServer();

import mongoose from 'mongoose';
import Villager from '../models/Villager.js';
import mockData from './mockVillagerData.json';
import connect from '../utils/connect.js';


describe('villager routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });
    
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  beforeEach(() => {
    return Villager.create(mockData);
  });
    
  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });

  it('can get all villagers', () => {
    return request(app)
      .get('/villagers?perPage=50')
      .then(res => {
        expect(res.body).toHaveLength(25);
      });
  });

  it('can return all villagers that are male', () => {
    return request(app)
      .get('/villagers?gender=male')
      .then(res => {
        const filteredMales = res.body.filter(villager => villager.gender === 'male');
        expect(res.body.length).toEqual(filteredMales.length);
      });
  });

  it('can return Agent S', () => {
    return request(app)
      .get('/villagers?name=agent s')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          url: 'https://animalcrossing.fandom.com/wiki/Agent_S',
          birthday: 'July 2nd (Cancer)',
          coffee: {
            roast: 'Mocha',
            milk: 'The regular amount of milk',
            sugar: 'Two spoonfuls of sugar'
          },
          gender: 'female',
          goal: 'Dancer',
          image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/a/a7/Agent_S_NH.png/revision/latest?cb=20200719092526',
          japaneseName: '2ごう Ni Gō',
          name: 'Agent S',
          personality: 'peppy',
          phrase: 'sidekick',
          quote: 'You gotta put the pedal to the metal!',
          skill: 'Limboing',
          song: {
            link: 'https://animalcrossing.fandom.com/wiki/Go_K.K._Rider',
            name: 'Go K.K. Rider',
          },
          species: 'squirrel',
          style: 'Sporty',
          __v: 0
        }]);
      });
  });

  it('can get a villager by id', async() => {
    const newVillager = await Villager.create({
      url: 'https://animalcrossing.fandom.com/wiki/Agent_S',
      birthday: 'July 2nd (Cancer)',
      coffee: {
        roast: 'Mocha',
        milk: 'The regular amount of milk',
        sugar: 'Two spoonfuls of sugar'
      },
      gender: 'female',
      goal: 'Dancer',
      image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/a/a7/Agent_S_NH.png/revision/latest?cb=20200719092526',
      japaneseName: '2ごう Ni Gō',
      name: 'Agent S',
      personality: 'peppy',
      phrase: 'sidekick',
      quote: 'You gotta put the pedal to the metal!',
      skill: 'Limboing',
      song: {
        link: 'https://animalcrossing.fandom.com/wiki/Go_K.K._Rider',
        name: 'Go K.K. Rider',
      },
      species: 'squirrel',
      style: 'Sporty'
    });

    return request(app)
      .get(`/villagers/${newVillager._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: newVillager._id.toString(),
          url: 'https://animalcrossing.fandom.com/wiki/Agent_S',
          birthday: 'July 2nd (Cancer)',
          coffee: {
            roast: 'Mocha',
            milk: 'The regular amount of milk',
            sugar: 'Two spoonfuls of sugar'
          },
          gender: 'female',
          goal: 'Dancer',
          image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/a/a7/Agent_S_NH.png/revision/latest?cb=20200719092526',
          japaneseName: '2ごう Ni Gō',
          name: 'Agent S',
          personality: 'peppy',
          phrase: 'sidekick',
          quote: 'You gotta put the pedal to the metal!',
          skill: 'Limboing',
          song: {
            link: 'https://animalcrossing.fandom.com/wiki/Go_K.K._Rider',
            name: 'Go K.K. Rider',
          },
          species: 'squirrel',
          style: 'Sporty',
          __v: 0
        });
      });
  });

  it('can find all villagers that are koalas', () => {
    return request(app)
      .get('/villagers?species=koala')
      .then(res => {
        const filteredKoalas = res.body.filter(villager => villager.species === 'koala');
        expect(res.body.length).toEqual(filteredKoalas.length);
      });
  });

  it('can find all villagers using graphql', () => {
    const query = '{ getVillagers { name } }';

    return request(app)
      .post('/graphql')
      .send({ query })
      .then(res => {
        expect(res.body.data.getVillagers).toHaveLength(25);
      });
  });

  it('can find agent s using graphql', () => {
    const query = '{ getVillagers(name: "agent s") { name japaneseName url } }';

    return request(app)
      .post('/graphql')
      .send({ query })
      .then(res => {
        expect(res.body.data.getVillagers).toEqual([
          {
            japaneseName: '2ごう Ni Gō', 
            name: 'Agent S', 
            url: 'https://animalcrossing.fandom.com/wiki/Agent_S'
          }
        ]);
      });
  });

  it('can find a villager by id using graphql', async() => {
    const newVillager = await Villager.create({
      url: 'https://animalcrossing.fandom.com/wiki/Agent_S',
      birthday: 'July 2nd (Cancer)',
      coffee: {
        roast: 'Mocha',
        milk: 'The regular amount of milk',
        sugar: 'Two spoonfuls of sugar'
      },
      gender: 'female',
      goal: 'Dancer',
      image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/a/a7/Agent_S_NH.png/revision/latest?cb=20200719092526',
      japaneseName: '2ごう Ni Gō',
      name: 'Agent S',
      personality: 'peppy',
      phrase: 'sidekick',
      quote: 'You gotta put the pedal to the metal!',
      skill: 'Limboing',
      song: {
        link: 'https://animalcrossing.fandom.com/wiki/Go_K.K._Rider',
        name: 'Go K.K. Rider',
      },
      species: 'squirrel',
      style: 'Sporty'
    });

    const query = `{ getVillagerById(_id: "${newVillager._id}" ) { _id } }`;

    return request(app)
      .post('/graphql')
      .send({ query })
      .then(res => {
        expect(res.body.data.getVillagerById._id).toEqual(newVillager._id.toString());
      });
  });

  it('can get the names of all female koalas using graphql', () => {
    const query = '{ getVillagers(species: "koala" gender: "female") { name } }';

    return request(app)
      .post('/graphql')
      .send({ query })
      .then(res => {
        expect(res.body.data.getVillagers).toEqual([{ name: 'Alice' }]);
      });
  });

  it('can get all names of lazy villagers using graphql', () => {
    const query = '{ getVillagers(personality: "lazy") { name } }';

    return request(app)
      .post('/graphql')
      .send({ query })
      .then(res => {
        expect(res.body.data.getVillagers).toEqual([
          { name: 'Al' },
          { name: 'Alfonso' },
          { name: 'Anchovy' }
        ]);
      });
  });
});
