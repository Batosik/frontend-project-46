import * as fs from 'node:fs';
import * as path from 'node:path';
import parse from './parser.js';
import diffOutput from './formaters/index.js';
import findDiff from './findDiff.js';

const getData = (filePath) => {
  const absPath = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(absPath, { encoding: 'utf-8' });
};

const getFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (file1path, file2path, fromatName) => {
  const data1 = getData(file1path);
  const format1 = getFormat(file1path);
  const obj1 = parse(data1, format1);
  const data2 = getData(file2path);
  const format2 = getFormat(file2path);
  const obj2 = parse(data2, format2);
  const diff = findDiff(obj1, obj2);
  return diffOutput(diff, fromatName);
};

//console.log(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'stylish'));

export default genDiff;
