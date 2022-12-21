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
    res.status(400).json({
      error: '`username`, `email` and `password` expacted',
    });

    return;
  }

  const user = new User();
  user.email = email;
  user.username = username;
  user.password = md5(password + SECRET);

  if (await sourseData.manager.findOneBy(User, { email })) {
    res.status(400).json({
      error: 'such email already exists',
    });

    return;
  }

  if (await sourseData.manager.findOneBy(User, { username })) {
    res.status(400).json({
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
    res.status(400).json({
      error: 'no such user exists',
    });

    return;
  }

  const passwordHash = md5(password + SECRET);

  if (passwordHash !== user.password) {
    res.status(400).json({
      error: 'invalid password',
    });

    return;
  }

  const tokenExpires = String(Date.now() + TOKEN_EXPIRES_TIME);
  const token = md5(user.password + user.email + user.username + SECRET + tokenExpires);
  
  user.token = token;
  user.tokenExpires = tokenExpires;
  await sourseData.manager.save(user);

  res.setHeader('Set-Cookie', `user_token=${token}`);
  res.json({ token });
};

export const checkAuth = async (req: Request, res: Response, sourseData: DataSource) => {
  const cookieToken = req.headers.cookie?.match(/user_token=([a-zA-Z0-9]+)/)?.[1];
  const token = (req.query.token || cookieToken) as string;

  if (!token) {
    res.status(400).json({
      error: 'token is requied',
    });

    return;
  }

  const user = await sourseData.manager.findOneBy(User, { token });

  if (!user) {
    res.status(400).json({
      error: 'invalid token',
    });

    return;
  }
  
  const expires = parseInt(user.tokenExpires, 10);
  
  if (Date.now() > expires) {
    res.status(400).json({
      error: 'token expired',
    });

    return;
  }

  res.setHeader('Set-Cookie', `user_token=${token}`);
  res.json({
    token,
  });
};

export const logout = async (req: Request, res: Response, sourseData: DataSource) => {
  res.setHeader('Set-Cookie', 'user_token=;');
  res.json({
    message: 'successfuly logged out',
  })
};
