import _ from 'lodash';
import * as fs from 'node:fs';
import * as path from 'node:path';
import parse from './src/parser.js';
import chooseFormater from './src/formaters/index.js';

const getData = (filePath) => {
  const absPath = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(absPath, { encoding: 'utf-8' });
};

const getFormat = (filepath) => path.extname(filepath).slice(1);

const compareObjects = (branch1, branch2) => {
  const keys = _.keys({ ...branch1, ...branch2 });
  const uniqKeys = _.uniq(keys);
  const sortedKeys = _.sortBy(uniqKeys);
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
  const data1 = getData(file1path);
  const data2 = getData(file2path);
  const format1 = getFormat(file1path);
  const format2 = getFormat(file2path);
  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);
  const diff = compareObjects(obj1, obj2);
  // return JSON.stringify(diff, null, 2)
  return chooseFormater(diff, fromatName);
};

console.log(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'stylish'));

export default genDiff;
