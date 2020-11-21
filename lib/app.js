const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const villagerSchema = require('./graphql/schema.js');
const { villagerResolver, villagerByIdResolver } = require('./graphql/resolvers.js');
const villagerQueries = require('./graphql/typeDef.js');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());

app.use('/villagers', require('./routes/villagers'));

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(villagerQueries + villagerSchema),
  rootValue: {
    getVillagers: villagerResolver,
    getVillagerById: villagerByIdResolver
  },
  graphiql: true
}));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
