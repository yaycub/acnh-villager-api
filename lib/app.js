import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pageRoutes from './controllers/pages.js';
import notFound from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import villagerRoutes from './routes/villagers.js';

import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import villagerSchema from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';
const { villagerResolver, villagerByIdResolver } = resolvers;
import villagerQueries from './graphql/typeDef.js';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve(path.dirname(fileURLToPath(import.meta.url)), './views'));

app.use(express.static('public'));

app.use('/', pageRoutes);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());

app.use('/villagers', villagerRoutes);

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(villagerQueries + villagerSchema),
  rootValue: {
    getVillagers: villagerResolver,
    getVillagerById: villagerByIdResolver
  },
  graphiql: true
}));

app.use(notFound);
app.use(errorMiddleware);

export default app;
