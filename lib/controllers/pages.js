import { Router } from 'express';
import queryParser from '../middleware/queryParser.js';
import Villager from '../models/Villager.js';

export default Router()
  .get('/', queryParser, (req, res) => {
    Promise.all([
      Villager
        .find(req.query)
        .limit(1)
        .lean(),
      Villager
        .findById('5f5fb4bbbfd05c2aed82e461')
    ])
      .then(([villagers, villagerById]) => {
        res.render('documents', {
          villagers,
          villagerById
        });
      });
  });
