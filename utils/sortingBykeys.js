import _ from 'lodash';

const sorting = (obj) => _.sortBy(Object.entries(obj), [(key) => key]);

export default sorting;
