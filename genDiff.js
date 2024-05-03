import _ from 'lodash';
import sorting from './utils/sortingBykeys.js';
import parse from './src/parsers.js';

const genDiff = (file1path, file2path) => {
  const file1 = parse(file1path);
  const file2 = parse(file2path);
  const sorted1 = sorting(file1);
  const sorted2 = sorting(file2);
  const result = sorted1.reduce((acc, curr) => {
    const [key, value] = curr;
    if (Object.hasOwn(file2, key)) {
      if (_.isEqual(value, file2[key])) {
        acc[`  ${key}`] = value;
      } else {
        acc[`- ${key}`] = value;
        acc[`+ ${key}`] = file2[key];
      }
    } else {
      acc[`- ${key}`] = value;
    }
    return acc;
  }, {});
  const rest = sorted2.reduce((acc, curr) => {
    const [key, value] = curr;
    if (!Object.hasOwn(file1, key)) {
      acc[`+ ${key}`] = value;
    }
    return acc;
  }, {});
  // func
  const last = Object.entries(Object.assign(result, rest)).map(([key, value]) => `  ${key}: ${value}`);
  const output = ['{', ...last, '}'].join('\n');
  return output;
};

export default genDiff;
