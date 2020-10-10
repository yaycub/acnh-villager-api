# AC-NH Villager API
- Simple scraper built with Node.js, Cheerio, Superagent, Express, Mongoose, & MongoDB
- URL: https://ac-vill.herokuapp.com

&nbsp;

## Endpoints:

> ### `/villagers` 
>
>
>```js 
>[
>  {
>    _id: "5f5fb4bbbfd05c2aed82e460",
>    url: "https://animalcrossing.fandom.com/wiki/Admiral",
>    name: "Admiral",
>    japaneseName: "イッテツ Ittetsu",
>    image: "https://vignette.wikia.nocookie.net/animalcrossing/images/e/ed/Admiral_NH.png/revision/latest?cb=20200802081138",
>    quote: "Only quitters give up.",
>    gender: "male",
>    personality: "cranky",
>    species: "bird",
>    birthday: "January 27th (Aquarius)",
>    phrase: "aye aye",
>    skill: "Writing about pickles",
>    goal: "Fisherman",
>    coffee: 
>      {
>        roast: "Blue Mountain",
>        milk: "The regular amount of milk",
>        sugar: "2 spoonfuls of sugar"
>      },
>    song: 
>      {
>        name: "Steep Hill",
>        link: "https://animalcrossing.fandom.com/wiki/Steep_Hill"
>      },
>    style: "n/a",
>    __v: 0
>  }
>]
>```
>&nbsp;
>
>> ### Query Parameters:
>> ---
>> Key | Default | Description
>> --- | --- | ---
>> page | 1 | page based on perPage offset
>> perPage | 25 | amount of results per page
>> name | n/a | case insensitive search of villager names
> &nbsp;

&nbsp;

---

&nbsp;

>### `/villagers/:_id` 
>
>```js
>{
>    _id: "5f5fb4bbbfd05c2aed82e460",
>    url: "https://animalcrossing.fandom.com/wiki/Admiral",
>    name: "Admiral",
>    japaneseName: "イッテツ Ittetsu",
>    image: "https://vignette.wikia.nocookie.net/animalcrossing/images/e/ed/Admiral_NH.png/revision/latest?cb=20200802081138",
>    quote: "Only quitters give up.",
>    gender: "male",
>    personality: "cranky",
>    species: "bird",
>    birthday: "January 27th (Aquarius)",
>    phrase: "aye aye",
>    skill: "Writing about pickles",
>    goal: "Fisherman",
>    coffee: 
>      {
>        roast: "Blue Mountain",
>        milk: "The regular amount of milk",
>        sugar: "2 spoonfuls of sugar"
>      },
>    song: 
>      {
>        name: "Steep Hill",
>        link: "https://animalcrossing.fandom.com/wiki/Steep_Hill"
>      },
>    style: "n/a",
>    __v: 0
>}
>```
> &nbsp;
