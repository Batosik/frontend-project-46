import plain from './plain.js';
import stylish from './stylish.js';

const chooseFormater = (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(diff);
    case 'stylish':
      return stylish(diff);
    default:
      throw Error('Unknown format');
  }
};

export default chooseFormater;
