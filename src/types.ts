import type { DataSource } from 'typeorm';
import type { Request, Response } from 'express';

export type EndpointView = (req: Request, res: Response, sourseData: DataSource) => Promise<void>;
