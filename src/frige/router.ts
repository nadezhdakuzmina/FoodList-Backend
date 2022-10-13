import { Router } from 'express';

import { getList, addItem, deleteItem } from './views';
import { authWrapper } from 'src/user';

import type { DataSource } from 'typeorm';

export const frigeRouter = (sourseData: DataSource) => {
  const router = Router();

  router.get('/', (req, res) => authWrapper(getList)(req, res, sourseData));
  router.post('/add', (req, res) => authWrapper(addItem)(req, res, sourseData));
  router.post('/delete', (req, res) => authWrapper(deleteItem)(req, res, sourseData));

  return router;
}
