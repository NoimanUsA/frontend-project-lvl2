import _ from 'lodash';


const space = (depth) => '  '.repeat(depth);


const stringifyObject = (obj, depth = 0) => {
  const keys = Object.keys(obj);
  return `{\n${keys.map((el) => `${space(depth + 3)}${el}: ${obj[el]}`)}\n${space(depth + 1)}}`;
};
const stringifyArray = (arr) => {
  const items = arr.map((el) => `${el}`).join(',').trim();
  return `[${items}]`;
};
const stringify = (value, depth) => {
  if (_.isPlainObject(value)) {
    return stringifyObject(value, depth);
  }
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }
  return value;
};

export default (ast) => {
  const genDiff = (astTree, depth = 1) => {
    const type = {
      unchanged: (el) => `${space(depth)}  ${el.name}: ${stringify(el.value, depth)}`,
      changed: (el) => [
        `${space(depth)}+ ${el.name}: ${stringify(el.valueAfter, depth)}`,
        `${space(depth)}- ${el.name}: ${stringify(el.valueBefore, depth)}`,
      ],
      deleted: (el) => `${space(depth)}- ${el.name}: ${stringify(el.value, depth)}`,
      added: (el) => `${space(depth)}+ ${el.name}: ${stringify(el.value, depth)}`,
      parents: (el) => `${space(depth)}  ${el.name}: ${genDiff(el.children, depth + 2)}`,
    };
    return `{\n${_.flatten(astTree.map((el) => type[el.type](el))).join('\n')}\n${space(depth - 1)}}`;
  };
  return genDiff(ast);
};
