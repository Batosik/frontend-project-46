import _ from "lodash";

const stringify = (currentValue, depth) => {
  const replacer = ' '
  const spacesCount = 4
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

const stylish = (diff) => {
  if (!Array.isArray(diff)) {
    return
  }
  // const symbols = {
  //   'add': '+' ,
  // 'equal': '  ',
  // 'remove': '- ',
  // }
  const iter = (diff, depth) => {
  const replacer = ' '
  const spaceCount = 4
  const indentSize = depth * spaceCount
  const curentIndent = replacer.repeat(indentSize - 2)
  const braketIndent = replacer.repeat(indentSize - spaceCount)
    const result = diff.map((item) => {
      const { type } = item 
      if ( type === 'nested') {
        return `${curentIndent}  ${item.key}: ${iter(item.value, depth + 1)}`
      } else if ( type === 'add') {
        return `${curentIndent}+ ${item.key}: ${stringify(item.value, depth + 1)}`
      } else if ( type === 'removed') {
        return `${curentIndent}- ${item.key}: ${stringify(item.value, depth + 1)}`
      } else if ( type === 'changed') {
        return `${curentIndent}- ${item.key}: ${stringify(item.oldValue, depth+1)}\n${curentIndent}+ ${item.key}: ${stringify(item.newValue, depth+1)}`
      } else if ( type === 'equal') {
        return `${curentIndent}  ${item.key}: ${stringify(item.value, depth+1)}`
      }             
    })
    return ['{',
    ...result, `${braketIndent}}`
    ].join('\n')
  }
return iter(diff, 1)
}

export default stylish


