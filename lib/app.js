const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const villagerSchema = require('./graphql/schema.js');
const villagerResolver = require('./graphql/resolvers.js');
const villagerQueries = require('./graphql/typeDef.js');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());

app.use('/villagers', require('./routes/villagers'));

const root = {
  getVillagers: villagerResolver
};

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(villagerQueries + villagerSchema),
  rootValue: root,
  graphiql: true
}));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
