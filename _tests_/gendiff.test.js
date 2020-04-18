import path from 'path';
import fs from 'fs';
import makeDiff from '../src/index.js';


const getPathOfFile = (before, after, result) => {
  const dirPath = `${__dirname}/_fixtures_`;
  const dirOfFormat = path.extname(before).substring(1);
  return [path.resolve(dirPath, dirOfFormat, before), path.resolve(dirPath, dirOfFormat, after), path.resolve(dirPath, 'results', result)];
};

const data = [
  ['before.json', 'empty.json', 'beforeWithEmpty'],
  ['empty.json', 'after.json', 'emptyWithAfter'],
  ['before.json', 'after.json', 'result'],
  ['nestedBefore.json', 'nestedAfter.json', 'nestedResult'],
  ['before.yml', 'empty.yml', 'beforeWithEmpty'],
  ['empty.yml', 'after.yml', 'emptyWithAfter'],
  ['before.yml', 'after.yml', 'result'],
  ['nestedBefore.yml', 'nestedAfter.yml', 'nestedResult'],
  ['before.ini', 'empty.ini', 'beforeWithEmpty'],
  ['empty.ini', 'after.ini', 'emptyWithAfter'],
  ['before.ini', 'after.ini', 'result'],
  ['nestedBefore.ini', 'nestedAfter.ini', 'nestedResult'],

  ['nestedBefore.json', 'nestedAfter.json', 'plainNestedResult', 'plain'],
  ['nestedBefore.yml', 'nestedAfter.yml', 'plainNestedResult', 'plain'],
  ['nestedBefore.ini', 'nestedAfter.ini', 'plainNestedResult', 'plain'],
  ['before.json', 'after.json', 'plainResult', 'plain'],
  ['before.yml', 'after.yml', 'plainResult', 'plain'],
  ['before.ini', 'after.ini', 'plainResult', 'plain'],

  ['nestedBefore.json', 'nestedAfter.json', 'jsonNestedResult', 'json'],
];


test.each(data)('diff(%p, %p)', (beforePath, afterPath, resultPath, format = 'tree') => {
  const [before, after, result] = getPathOfFile(beforePath, afterPath, resultPath);
  expect(makeDiff(before, after, format)).toBe(fs.readFileSync(result, 'utf-8'));
});
