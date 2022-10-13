import { Food } from './models';

import type { Request, Response } from 'express';
import type { DataSource } from 'typeorm';

export const addFood = async (req: Request, res: Response, sourseData: DataSource) => {
  const {
    foodname,
    time,
    category,
  } = req.body;

  const food = new Food();
  food.foodname = foodname;
  food.time = time;
  food.category = category;

  if (await sourseData.manager.findOneBy(Food, { foodname })) {
    res.json({
      error: 'such food already exists',
    });

    return;
  }

  try {
    const addFood = await sourseData.manager.save(food);

    res.json({
      message: 'successfuly added new food',
      userID: addFood.id,
    });
  } catch(error) {
    res.json({
      error: 'unexpacted error',
    });
  }
};

export const foodList = async (req: Request, res: Response, sourseData: DataSource) => {
  const food = await sourseData.manager.find(Food);

  res.json({
    food: food,
  });
};

export const deleteFood = async (req: Request, res: Response, sourseData: DataSource) => {
  const foodname = req.query.foodname as string;

  if (foodname === undefined) {
    res.json({
      error: 'invalid food',
    });

    return;
  }

  const findFood = await sourseData.manager.findOneBy(Food, { foodname });

  if (!findFood) {
    res.json({
      error: 'no such food exists',
    });

    return;
  }
  await sourseData.manager.remove(findFood);
};

export const getFood = async (req: Request, res: Response, sourseData: DataSource) => {
  const foodname = req.query.foodname as string;

  if (foodname === undefined) {
    res.json({
      error: 'invalid food',
    });

    return;
  }

  const findFood = await sourseData.manager.findOneBy(Food, { foodname });

  if (!findFood) {
    res.json({
      error: 'no such user exists',
    });

    return;
  }

  res.json({
    findFood,
  });
};