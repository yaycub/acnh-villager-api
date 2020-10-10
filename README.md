# AC-NH Villager API

- Simple scraper build with Node.js and Cheerio
- MongoDB Atlas cluster DB

## Endpoints:

### `https://ac-vill.herokuapp.com/villagers` :

```js 
[
    {
    _id: "5f5fb4bbbfd05c2aed82e460",
    url: "https://animalcrossing.fandom.com/wiki/Admiral",
    name: "Admiral",
    japaneseName: "イッテツ Ittetsu",
    image: "https://vignette.wikia.nocookie.net/animalcrossing/images/e/ed/Admiral_NH.png/revision/latest?cb=20200802081138",
    quote: "Only quitters give up.",
    gender: "male",
    personality: "cranky",
    species: "bird",
    birthday: "January 27th (Aquarius)",
    phrase: "aye aye",
    skill: "Writing about pickles",
    goal: "Fisherman",
    coffee: 
      {
        roast: "Blue Mountain",
        milk: "The regular amount of milk",
        sugar: "2 spoonfuls of sugar"
      },
    song: 
      {
        name: "Steep Hill",
        link: "https://animalcrossing.fandom.com/wiki/Steep_Hill"
      },
    style: "n/a",
    __v: 0
  }
]
```

All properties are able to be queryParams (ie. `https://ac-vill.herokuapp.com/villagers/villagers?name=agent s`), except for coffee and song properties. 

> Pagination
> param | value
> --- | ---
> page | default is 1
> perPage | default is 25

---
---
### `https://ac-vill.herokuapp.com/villagers/:_id` :

```js
{
    _id: "5f5fb4bbbfd05c2aed82e460",
    url: "https://animalcrossing.fandom.com/wiki/Admiral",
    name: "Admiral",
    japaneseName: "イッテツ Ittetsu",
    image: "https://vignette.wikia.nocookie.net/animalcrossing/images/e/ed/Admiral_NH.png/revision/latest?cb=20200802081138",
    quote: "Only quitters give up.",
    gender: "male",
    personality: "cranky",
    species: "bird",
    birthday: "January 27th (Aquarius)",
    phrase: "aye aye",
    skill: "Writing about pickles",
    goal: "Fisherman",
    coffee: 
      {
        roast: "Blue Mountain",
        milk: "The regular amount of milk",
        sugar: "2 spoonfuls of sugar"
      },
    song: 
      {
        name: "Steep Hill",
        link: "https://animalcrossing.fandom.com/wiki/Steep_Hill"
      },
    style: "n/a",
    __v: 0
}
```

