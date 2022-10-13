import { Router } from 'express';

import { authWrapper } from 'src/user';
import { cartList, addItem, deleteItem, changeStatus } from './views';

import type { DataSource } from 'typeorm';

export const cartItemRouter = (sourseData: DataSource) => {
  const router = Router();

  router.get('/', (req, res) => authWrapper(cartList)(req, res, sourseData));
  router.post('/add', (req, res) => authWrapper(addItem)(req, res, sourseData));
  router.post('/delete', (req, res) => authWrapper(deleteItem)(req, res, sourseData));
  router.post('/check', (req, res) => authWrapper(changeStatus)(req, res, sourseData));

  return router;
}
