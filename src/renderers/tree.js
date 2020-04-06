import _ from 'lodash';


const space = (depth) => '  '.repeat(depth);


const stringifyObject = (obj, depth = 0) => {
  const keys = Object.keys(obj);
  return `{\n${keys.map((el) => `${space(depth + 3)}${el}: ${obj[el]}`)}\n${space(depth + 1)}}`;
};
const stringifyArray = (arr) => {
  const items = arr.map(el => `${el}`).join(',').trim();
  return `[${items}]`;
};
const stringify = (property, depth) => {
  if (_.isPlainObject(property)) {
    return stringifyObject(property, depth);
  }
  if (Array.isArray(property)) {
    return stringifyArray(property);
  }
  return property;
};

export default (ast) => {
  const makeDiff = (astree, depth = 1) => {
    const type = {
      unchanged: (el) => `${space(depth)}  ${el.name}: ${stringify(el.valueAfter, depth)}`,
      changed: (el) => [
        `${space(depth)}+ ${el.name}: ${stringify(el.valueAfter, depth)}`,
        `${space(depth)}- ${el.name}: ${stringify(el.valueBefore, depth)}`,
      ],
      deleted: (el) => `${space(depth)}- ${el.name}: ${stringify(el.valueBefore, depth)}`,
      added: (el) => `${space(depth)}+ ${el.name}: ${stringify(el.valueAfter, depth)}`,
      parents: (el) => `${space(depth)}  ${el.name}: ${makeDiff(el.children, depth + 2)}`,
    };
    return `{\n${_.flatten(astree.map((el) => type[el.type](el))).join('\n')}\n${space(depth - 1)}}`;
  };
  return makeDiff(ast);
};
