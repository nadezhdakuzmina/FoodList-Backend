import { Router } from 'express';

import { foodList, addFood, deleteFood, getFood } from './views';

import type { DataSource } from 'typeorm';

export const foodRouter = (sourseData: DataSource) => {
  const router = Router();

  router.get('/', (req, res) => foodList(req, res, sourseData));
  router.post('/add', (req, res) => addFood(req, res, sourseData));
  router.get('/delete', (req, res) => deleteFood(req, res, sourseData));
  router.get('/get', (req, res) => getFood(req, res, sourseData));

  return router;
}
