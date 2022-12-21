import { Router } from 'express';

import { accessControllOriginWrapper } from 'src/application/helpers';
import { getList, addItem, deleteItem } from './views';
import { authWrapper } from 'src/user';

import type { DataSource } from 'typeorm';

export const frigeRouter = (sourseData: DataSource) => {
  const router = Router();

  router.get('/', (req, res) => accessControllOriginWrapper(authWrapper(getList))(req, res, sourseData));
  router.post('/add', (req, res) => accessControllOriginWrapper(authWrapper(addItem))(req, res, sourseData));
  router.post('/delete', (req, res) => accessControllOriginWrapper(authWrapper(deleteItem))(req, res, sourseData));

  return router;
}
