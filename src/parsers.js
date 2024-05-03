import * as fs from 'node:fs';
import * as path from 'node:path';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const absfilepath = path.resolve(filepath);
  const file = fs.readFileSync(absfilepath, { encoding: 'utf-8' });
  if (absfilepath.endsWith('json')) {
    return JSON.parse(file);
  }
  return yaml.load(file);
};

export default parse;
