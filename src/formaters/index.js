import plain from './plain.js';
import stylish from './stylish.js';

const diffOutput = (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(diff);
    case 'stylish':
      return stylish(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw Error('Unknown format');
  }
};

export default diffOutput;
