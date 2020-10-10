const { Router } = require('express');
const Villager = require('../models/Villager');
const queryParser = require('../middleware/queryParser');

module.exports = Router()

  .get('/', queryParser, (req, res, next) => {
    console.log(req.query);
    const { page = 1, perPage = 25, ...queryParams } = req.query;

    Villager
      .find(queryParams)
      .skip(+perPage * (+page - 1))
      .limit(+perPage)
      .then(villagers => res.send(villagers))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Villager
      .findById(req.params.id)
      .then(villager => res.send(villager))
      .catch(next);
  });
