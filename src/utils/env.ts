import { readFileSync } from 'fs';

export const readEnv = (path: string): object => {
  const buffer = readFileSync(path);
  const lines = buffer.toString().split('\n');

  return lines.reduce((params, line) => {
    const [key, value] = line.split(/\s*=\s*/);

    if (key && value) {
      params[key] = value;
    }

    return params;
  }, {});
};

export const applyToEnv = (params: object) => {
  process.env = {
    ...process.env,
    ...params,
  };
};

