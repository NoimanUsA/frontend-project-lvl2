import _ from 'lodash';

// eslint-disable-next-line max-len
const areBothObject = (firstObj, secondObj, key) => _.isPlainObject(firstObj[key]) && _.isPlainObject(secondObj[key]);
const areKeysIndetity = (firstObj, secondObj, key) => firstObj[key] === secondObj[key];
const isAdded = (firstObj, secondObj, key) => !_.has(firstObj, key) && _.has(secondObj, key);
const isDeleted = (firstObj, secondObj, key) => _.has(firstObj, key) && !_.has(secondObj, key);


const genAst = (beforeObj, afterObj) => {
  const keys = _.union(Object.keys(beforeObj), Object.keys(afterObj)).sort();
  const result = keys.map((key) => {
    const handleKeys = [
      {
        check: isAdded(beforeObj, afterObj, key),
        handle: () => ({ name: key, type: 'added', value: afterObj[key] }),
      },
      {
        check: isDeleted(beforeObj, afterObj, key),
        handle: () => ({ name: key, type: 'deleted', value: beforeObj[key] }),
      },
      {
        check: areBothObject(beforeObj, afterObj, key),
        handle: () => ({ name: key, type: 'parents', children: genAst(beforeObj[key], afterObj[key]) }),
      },
      {
        check: areKeysIndetity(beforeObj, afterObj, key),
        handle: () => ({ name: key, type: 'unchanged', value: afterObj[key] }),
      },

      {
        check: !areKeysIndetity(beforeObj, afterObj, key),
        handle: () => ({
          name: key, type: 'changed', valueBefore: beforeObj[key], valueAfter: afterObj[key],
        }),
      },

    ];

    const { handle } = handleKeys.find(({ check }) => check);

    return handle();
  });


  return result;
};


export default genAst;
