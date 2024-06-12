import _ from 'lodash';

const stringify = (currentValue, depth) => {
  const replacer = ' ';
  const spacesCount = 4;
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }
  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  const lines = Object
    .entries(currentValue)
    .map(([key, value]) => `${currentIndent}${key}: ${stringify(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

export default stringify;
