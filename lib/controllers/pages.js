import { Router } from 'express';
import Villager from '../models/Villager.js';

export default Router()
  .get('/', (req, res, next) => {
    Villager
      .findOne()
      .then(villager => {
        res.render('documents', { villager });
      });
  });
