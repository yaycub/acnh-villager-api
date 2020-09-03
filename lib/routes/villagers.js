const { Router } = require('express');
const Villager = require('../models/Villager');

module.exports = Router()

  .get('/', (req, res, next) => {
    Villager
      .find(req.query)
      .limit(25)
      .then(villagers => res.send(villagers))
      .catch(next);
  });
