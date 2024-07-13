import _ from 'lodash';

const findDiff = (branch1, branch2) => {
  const keys = _.keys({ ...branch1, ...branch2 });
  const sortedKeys = _.sortBy(_.uniq(keys));
  const result = sortedKeys.map((key) => {
    if (!Object.hasOwn(branch1, key) && Object.hasOwn(branch2, key)) {
      return { type: 'add', key, value: branch2[key] };
    } if (Object.hasOwn(branch2, key)) {
      if (_.isObject(branch1[key]) && _.isObject(branch2[key])) {
        return { type: 'nested', key, children: findDiff(branch1[key], branch2[key]) };
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

export default findDiff;
