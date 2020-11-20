const queries = `
  type Query {
    getVillagers(name: String, gender: String, species: String): [Villager]
  }
`;

module.exports = queries;
