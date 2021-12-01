const villagerSchema = `
  type CoffeeType {
    roast: String
    milk: String
    sugar: String
  }

  type SongType {
    name: String
    link: String
  }

  type Villager {
    _id: String
    url: String
    name: String
    japaneseName: String
    image: String
    quote: String
    gender: String
    personality: String
    species: String
    birthday: String
    phrase: String
    skill: String
    goal: String
    coffee: CoffeeType
    song: SongType
    style: String
  }
`;

export default villagerSchema;
