import express from 'express';
import villagers from './routes/villagers.js';

const app = express();

app.use(express.json());

app.use('/villagers', villagers);

export default app;
