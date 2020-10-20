import { Router } from 'express';
import Villager from '../models/Villager.js';
import queryParser from '../middleware/queryParser.js';

export default Router()

  .get('/', queryParser, (req, res, next) => {
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
