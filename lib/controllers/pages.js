import { Router } from 'express';
import queryParser from '../middleware/queryParser.js';
import Villager from '../models/Villager.js';

export default Router()
  .get('/', queryParser, (req, res, next) => {
    Villager
      .find(req.query)
      .limit(1)
      .then(villager => {
        res.render('documents', { villager });
      });
  });
