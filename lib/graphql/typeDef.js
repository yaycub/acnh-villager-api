const queries = `
  type Query {
    getVillagers(
      name: String, 
      gender: String, 
      species: String, 
      personality: String,
      birthday: String,
      phrase: String,
      quote: String,
      goal: String,
      skill: String,
      style: String
      ): [Villager]
    getVillagerById(_id: String): Villager
  }
`;

module.exports = queries;
