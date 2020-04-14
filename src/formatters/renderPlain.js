import _ from 'lodash';

const stringifyArray = (arr) => {
  const items = arr.map((el) => `${el}`).join(',').trim();
  return `[${items}]`;
};
const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  return value;
};

export default (ast) => {
  const makePlain = (astTree, compoundName = '') => {
    const typesObj = {
      changed: (el) => `Property '${compoundName}${el.name}' was changed from '${stringify(el.valueBefore)}' to '${stringify(el.valueAfter)}'`,
      deleted: (el) => `Property '${compoundName}${el.name}' was deleted`,
      added: (el) => `Property '${compoundName}${el.name}' was added with value: ${stringify(el.value)}`,
      parents: (el) => makePlain(el.children, `${compoundName}${el.name}.`),
    };

    return `${astTree.filter((el) => el.type !== 'unchanged').map((el) => typesObj[el.type](el)).filter((el) => el !== '').join('\n')}`;
  };

  return makePlain(ast);
};
