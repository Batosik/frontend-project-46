import _ from 'lodash';

const formValueInOutput = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return value;
};

const buildPath = (path) => path.join('.');

const plain = (diff) => {
  const iter = (diffItems, path) => {
    const result = diffItems.map((item) => {
      const newPath = path.concat([item.key]);
      const value = formValueInOutput(item.value);
      const { type } = item;
      switch (type) {
        case 'add':
          return `Property '${buildPath(newPath)}' was added with value: ${value}`;
        case 'removed':
          return `Property '${buildPath(newPath)}' was removed`;
        case 'changed':
          return `Property '${buildPath(newPath)}' was updated. From ${formValueInOutput(item.oldValue)} to ${value}`;
        case 'nested':
          return iter(item.value, path.concat([item.key]));
        default:
          return null;
      }
    });
    return result.filter((item) => item !== null).join('\n');
  };
  return iter(diff, []);
};

export default plain;
