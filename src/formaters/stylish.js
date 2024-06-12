import stringify from '../../utils/stringify.js';

const getSign = (type) => {
  const symbols = {
    add: '+ ',
    equal: '  ',
    removed: '- ',
  };
  return symbols[type];
};

const stylish = (diff) => {
  const iter = (diffItems, depth) => {
    const replacer = ' ';
    const spaceCount = 4;
    const indentSize = depth * spaceCount;
    const curentIndent = replacer.repeat(indentSize - 2);
    const braketIndent = replacer.repeat(indentSize - spaceCount);
    const result = diffItems.map((item) => {
      const { type } = item;
      if (type === 'nested') {
        return `${curentIndent}  ${item.key}: ${iter(item.value, depth + 1)}`;
      } if (type === 'changed') {
        return `${curentIndent}- ${item.key}: ${stringify(item.oldValue, depth + 1)}\n${curentIndent}+ ${item.key}: ${stringify(item.value, depth + 1)}`;
      }
      return `${curentIndent}${getSign(type)}${item.key}: ${stringify(item.value, depth + 1)}`;
    });
    return `{\n${
      result.join('\n')
    }\n${braketIndent}}`;
  };
  return iter(diff, 1);
};

export default stylish;
