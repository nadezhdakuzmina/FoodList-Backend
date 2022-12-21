import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';

import User from 'src/user';
import Card from 'src/cart';
// import Food from 'src/food';
import FrigeItem from 'src/frige';

import { DataSource } from 'typeorm';
import { mainRouter } from './controller';

import {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
} from '@constants';
import { preflightAdapter } from './helpers';

export const app = express();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  entities: [User, /* Food, */ Card, FrigeItem],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then((connection) => app.listen(PORT, () => {
    preflightAdapter(app);
    app.use(bodyParser.json());
    app.use(mainRouter(connection));

    console.log(`Application listening on port ${PORT}`);
  }))
  .catch((error) => console.log(error));
