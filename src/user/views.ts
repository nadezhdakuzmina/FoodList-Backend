import { User } from './models';
import md5 from 'md5';

import { SECRET, TOKEN_EXPIRES_TIME } from '@constants';

import type { Request, Response } from 'express';
import type { DataSource } from 'typeorm';

export const createUser = async (req: Request, res: Response, sourseData: DataSource) => {
  const {
    username,
    email,
    password,
  } = req.body;

  if (!username || !email || !password) {
    res.json({
      error: '`username`, `email` and `password` expacted',
    });

    return;
  }

  const user = new User();
  user.email = email;
  user.username = username;
  user.password = md5(password + SECRET);

  if (await sourseData.manager.findOneBy(User, { email })) {
    res.json({
      error: 'such email already exists',
    });

    return;
  }

  if (await sourseData.manager.findOneBy(User, { username })) {
    res.json({
      error: 'This username taken',
    });

    return;
  }

  const createdUser = await sourseData.manager.save(user);

  res.json({
    message: 'successfuly created new user',
    userID: createdUser.id,
  });
};

export const auth = async (req: Request, res: Response, sourseData: DataSource) => {
  const {
    username,
    email,
    password,
  } = req.body;

  const user = await sourseData.manager.findOneBy(User, { username, email });

  if (!user) {
    res.json({
      error: 'no such user exists',
    });

    return;
  }

  const passwordHash = md5(password + SECRET);

  if (passwordHash !== user.password) {
    res.json({
      error: 'invalid password',
    });

    return;
  }

  const tokenExpires = String(Date.now() + TOKEN_EXPIRES_TIME);
  const token = md5(user.password + user.email + user.username + SECRET + tokenExpires);
  
  user.token = token;
  user.tokenExpires = tokenExpires;
  await sourseData.manager.save(user);

  res.json({ token });
};

export const checkAuth = async (req: Request, res: Response, sourseData: DataSource) => {
  const {
    token,
  } = req.body;

  if (!token) {
    res.json({
      error: 'token is requied',
    });

    return;
  }

  const user = await sourseData.manager.findOneBy(User, { token });

  if (!user) {
    res.json({
      error: 'invalid token',
    });

    return;
  }
  
  const expires = parseInt(user.tokenExpires, 10);
  
  if (Date.now() > expires) {
    res.json({
      error: 'token expired',
    });

    return;
  }

  res.json({
    message: 'success',
  });
};
