import { Router } from 'express';

import { accessControllOriginWrapper } from 'src/application/helpers';
import { createUser, auth, checkAuth, logout } from './views';

import type { DataSource } from 'typeorm';

export const userRouter = (sourseData: DataSource) => {
  const router = Router();

  router.post('/create', (req, res) => accessControllOriginWrapper(createUser)(req, res, sourseData));
  router.post('/auth', (req, res) => accessControllOriginWrapper(auth)(req, res, sourseData));
  router.get('/checkAuth', (req, res) => accessControllOriginWrapper(checkAuth)(req, res, sourseData));
  router.get('/logout', (req, res) => accessControllOriginWrapper(logout)(req, res, sourseData));

  return router;
}
