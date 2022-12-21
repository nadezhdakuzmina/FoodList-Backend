import { Router } from 'express';

import { accessControllOriginWrapper } from 'src/application/helpers';
import { authWrapper } from 'src/user';
import { cartList, addItem, deleteItem, changeStatus } from './views';

import type { DataSource } from 'typeorm';

export const cartItemRouter = (sourseData: DataSource) => {
  const router = Router();

  router.get('/', (req, res) => accessControllOriginWrapper(authWrapper(cartList))(req, res, sourseData));
  router.post('/add', (req, res) => accessControllOriginWrapper(authWrapper(addItem))(req, res, sourseData));
  router.post('/delete', (req, res) => accessControllOriginWrapper(authWrapper(deleteItem))(req, res, sourseData));
  router.post('/check', (req, res) => accessControllOriginWrapper(authWrapper(changeStatus))(req, res, sourseData));

  return router;
}
