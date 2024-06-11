import _ from 'lodash';
import * as fs from 'node:fs';
import * as path from 'node:path';
import parse from './src/parser.js';
import diffOutput from './src/formaters/index.js';

const getData = (filePath) => {
  const absPath = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(absPath, { encoding: 'utf-8' });
};

const getFormat = (filepath) => path.extname(filepath).slice(1);

const prepareData = (filepath) => {
  const data = getData(filepath);
  const format = getFormat(filepath);
  return parse(data, format);
};

const compareObjects = (branch1, branch2) => {
  const keys = _.keys({ ...branch1, ...branch2 });
  const sortedKeys = _.sortBy(_.uniq(keys));
  const result = sortedKeys.map((key) => {
    if (!Object.hasOwn(branch1, key) && Object.hasOwn(branch2, key)) {
      return { type: 'add', key, value: branch2[key] };
    } if (Object.hasOwn(branch2, key)) {
      if (_.isObject(branch1[key]) && _.isObject(branch2[key])) {
        return { type: 'nested', key, value: compareObjects(branch1[key], branch2[key]) };
      } if (_.isEqual(branch1[key], branch2[key])) {
        return { type: 'equal', key, value: branch1[key] };
      }
      return {
        type: 'changed', key, oldValue: branch1[key], value: branch2[key],
      };
    }
    return { type: 'removed', key, value: branch1[key] };
  });
  return result;
};

const genDiff = (file1path, file2path, fromatName) => {
  const obj1 = prepareData(file1path);
  const obj2 = prepareData(file2path);
  const diff = compareObjects(obj1, obj2);
  return diffOutput(diff, fromatName);
};

console.log(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json'))

export default genDiff;
