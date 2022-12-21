import type { EndpointView } from '@types';
import type { DataSource } from 'typeorm';
import type { Request, Response, Express } from 'express';

export const accessControllOriginWrapper = (func: EndpointView): EndpointView => {
  return async (req: Request, res: Response, sourseData: DataSource) => {
    const origin = req.headers.origin || '*';
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    return func(req, res, sourseData);
  };
};

export const preflightAdapter = (app: Express) => {
  app.options('*', (req, res) => {
    const origin = req.headers.origin || '*';
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    res.status(200).send();
  });
};
