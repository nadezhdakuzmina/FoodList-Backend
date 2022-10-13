import { User } from './models';

import type { EndpointView } from '@types';
import type { DataSource } from 'typeorm';
import type { Request, Response } from 'express';

export const authWrapper = (func: EndpointView): EndpointView => {
  return async (req: Request, res: Response, sourseData: DataSource) => {
    let token: string;
    if (req.method === 'POST') {
      token = req.body.token;
    } else if (req.method === 'GET') {
      token = req.query.token as string;
    } else {
      res.json({
        error: 'invalid method',
      });

      return;
    }


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

    return func(req, res, sourseData);
  };
};
