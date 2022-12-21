import path from 'path';
import { readEnv, applyToEnv } from './utils/env';

export const CORE_PATH = path.resolve(__dirname, '..');

if (process.env.MODE === 'dev') {
  const envDevPath = `${CORE_PATH}/.env.dev`;
  applyToEnv(readEnv(envDevPath));
}

export const PORT = 3001;
export const SECRET = process.env.SECRET;

export const TOKEN_EXPIRES_TIME = 86_400_000; // Один день

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = Number(process.env.DB_PORT);
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
