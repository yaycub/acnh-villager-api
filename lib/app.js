const express = require('express');
const app = express();

app.use(express.json());

app.use('/villagers', require('./routes/villagers'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
