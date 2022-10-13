import { Card } from './models';

import { User } from 'src/user';

import type { Request, Response } from 'express';
import type { DataSource } from 'typeorm';

export const addItem = async (req: Request, res: Response, sourseData: DataSource) => {
  const {
    name,
    token,
  } = req.body;

  const user = await sourseData.manager.findOneBy(User, { token });

  const card = new Card();
  card.user = user;
  card.name = name;
  card.isChecked = false;

  const { id } = await sourseData.manager.save(card);

  res.json({
    message: "created successfuly",
    id,
  });
};

export const deleteItem = async (req: Request, res: Response, sourseData: DataSource) => {
  const {
    id,
    token,
  } = req.body;

  const user = await sourseData.manager.findOneBy(User, { token });
  const card = await sourseData.manager.findOneBy(Card, { user, id });

  if (!card) {
    res.json({
      error: `couldn't find such item with id='${id}'`,
    });

    return;
  }

  await sourseData.manager.remove(card);

  res.json({
    message: "removed successfuly",
  });
};

export const cartList = async (req: Request, res: Response, sourseData: DataSource) => {
  const token = req.query.token as string;

  const user = await sourseData.manager.findOneBy(User, { token });
  const items = await sourseData.manager.findBy(Card, { user });

  res.json({
    items,
  });
};

export const changeStatus = async (req: Request, res: Response, sourseData: DataSource) => {
  const {
    id,
    token,
    status,
  } = req.body;

  const user = await sourseData.manager.findOneBy(User, { token });
  const card = await sourseData.manager.findOneBy(Card, { user, id });

  if (!card) {
    res.json({
      error: `couldn't find such item with id='${id}'`,
    });

    return;
  }

  card.isChecked = !!status;
  await sourseData.manager.save(card);

  res.json({
    message: "status changed successfuly",
  });
};
