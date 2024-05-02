import _ from 'lodash';

const genDiff = (file1, file2) => {
  // Переписать сделать отдельную функцию сортировки
  const sorted1 = _.sortBy(Object.entries(file1), [(key) => key]);
  const sorted2 = _.sortBy(Object.entries(file2), [(key) => key]);
  const result = sorted1.reduce((acc, curr) => {
    const [key, value] = curr;
    if (file2.hasOwnProperty(key)) {
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
    if (!file1.hasOwnProperty(key)) {
      acc[`+ ${key}`] = value;
    }
    return acc;
  }, {});
  return Object.assign(result, rest);
};

export default genDiff;
