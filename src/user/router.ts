import { Router } from 'express';

import { createUser, auth, checkAuth } from './views';

import type { DataSource } from 'typeorm';

export const userRouter = (sourseData: DataSource) => {
  const router = Router();

  router.post('/create', (req, res) => createUser(req, res, sourseData));
  router.post('/auth', (req, res) => auth(req, res, sourseData));
  router.post('/checkAuth', (req, res) => checkAuth(req, res, sourseData))

  return router;
}
