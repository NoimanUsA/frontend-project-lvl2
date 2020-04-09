import _ from 'lodash';

const hasBoth = (firstObj, secondObj, key) => _.has(firstObj, key) && _.has(secondObj, key);
// eslint-disable-next-line max-len
const areBothObject = (firstObj, secondObj, key) => _.isPlainObject(firstObj[key]) && _.isPlainObject(secondObj[key]);
const areKeysIndetity = (firstObj, secondObj, key) => firstObj[key] === secondObj[key];
const isAdded = (firstObj, secondObj, key) => !_.has(firstObj, key) && _.has(secondObj, key);


const makeAst = (beforeObj, afterObj) => {
  const keys = _.union(Object.keys(beforeObj), Object.keys(afterObj)).sort();
  const result = keys.reduce((acc, key) => {
    if (hasBoth(beforeObj, afterObj, key)) {
      if (areBothObject(beforeObj, afterObj, key)) {
        return [...acc, { name: key, type: 'parents', children: makeAst(beforeObj[key], afterObj[key]) }];
      }
      if (areKeysIndetity(beforeObj, afterObj, key)) {
        return [...acc, { name: key, type: 'unchanged', valueAfter: afterObj[key] }];
      }
      return [...acc, {
        name: key, type: 'changed', valueBefore: beforeObj[key], valueAfter: afterObj[key],
      }];
    }

    return isAdded(beforeObj, afterObj, key) ? [...acc, { name: key, type: 'added', valueAfter: afterObj[key] }] : [...acc, { name: key, type: 'deleted', valueBefore: beforeObj[key] }];
  }, []);

  return result;
};


export default makeAst;
