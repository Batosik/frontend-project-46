import _ from 'lodash';
import parse from './src/parsers.js';
import stylish from './src/formaters/stylish.js';

const compareObjects = (branch1, branch2) => {
  const keys = _.keys({...branch1, ...branch2});
  const uniqKeys = _.uniq(keys)
  const sortedKeys = _.sortBy(uniqKeys)
  const result = sortedKeys.map((key) => {
    if (!Object.hasOwn(branch1, key) && Object.hasOwn(branch2, key)) {
      return {type: 'add', key, value: branch2[key]}
    } else if (Object.hasOwn(branch2, key)) {      
        if (_.isObject(branch1[key]) && _.isObject(branch2[key])) {
          return {type: 'nested', key, value: compareObjects(branch1[key], branch2[key])}
        } else if (_.isEqual(branch1[key], branch2[key])) {
          return {type: 'equal', key, value: branch1[key]}
        } else {
          return {type: 'changed', key, oldValue: branch1[key], newValue: branch2[key]}
    }
    } else {
      return {type: 'removed', key, value: branch1[key]}
    } 
  })
  return result; 
}

const genDiff = (file1path, file2path, formater) => {
  const file1 = parse(file1path);
  const file2 = parse(file2path);
  const diff = compareObjects(file1, file2)
  const result = stylish(diff)
  return result
};



console.log(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'stylish'))


export default genDiff;
