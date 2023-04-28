import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(): string {
  const rootDir = resolve(__dirname, '..', '..', '..', '..'); // go up two levels from 'dist' to get the root directory
  const fallback: string = resolve(`${rootDir}/.development.env`);
  const filename: string = '.env';
  let filePath: string = resolve(`${rootDir}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}
