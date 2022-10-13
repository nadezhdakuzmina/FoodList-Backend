import { FrigeItem } from './models';
import { User } from 'src/user';

import type { Request, Response } from 'express';
import type { DataSource } from 'typeorm';

export const addItem = async (req: Request, res: Response, sourseData: DataSource) => {
  const {
    name,
    expires,
    token,
    foodType,
  } = req.body;

  if (!name || !expires || !foodType) {
    res.json({
      error: '`name`, `foodType` and `expires` expacted',
    });

    return;
  }

  if (isNaN(Number(expires))) {
    res.json({
      error: 'invalid expires date, should be integer',
    });

    return;
  }

  const user = await sourseData.manager.findOneBy(User, { token });

  const frigeItem = new FrigeItem();
  frigeItem.name = name;
  frigeItem.expires = String(parseInt(expires, 10));
  frigeItem.user = user;
  frigeItem.foodType = foodType;

  await sourseData.manager.save(frigeItem);

  res.json({
    message: "created successfuly",
  });
};

export const deleteItem = async (req: Request, res: Response, sourseData: DataSource) => {
  const {
    id,
    token
  } = req.body;

  const user = await sourseData.manager.findOneBy(User, { token });
  const frigeItem = await sourseData.manager.findOneBy(FrigeItem, { user, id });

  if (!frigeItem) {
    res.json({
      error: `couldn't find such item with id='${id}'`,
    });

    return;
  }

  await sourseData.manager.remove(frigeItem);

  res.json({
    message: "deleted successfuly",
  });
};

export const getList = async (req: Request, res: Response, sourseData: DataSource) => {
  const token = req.query.token as string;

  const user = await sourseData.manager.findOneBy(User, { token });
  const items = await sourseData.manager.findBy(FrigeItem, { user });

  res.json({
    items,
  });
};
