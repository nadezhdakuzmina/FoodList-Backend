import { Router } from 'express';

import { userRouter } from 'src/user';
// import { foodRouter } from 'src/food';
import { cartItemRouter } from 'src/cart';
import { frigeRouter } from 'src/frige';

import type { DataSource } from 'typeorm';

export const mainRouter = (dataSourse: DataSource) => {
  const router = Router();

  router.use('/users', userRouter(dataSourse));
  // router.use('/food', foodRouter(dataSourse));
  router.use('/cart', cartItemRouter(dataSourse));
  router.use('/frige', frigeRouter(dataSourse));

  return router;
};
