import path from 'path';
import fs from 'fs';
import makeDiff from '../src/index.js';

const getPathOfFile = (before, after, result) => {
  const dirPath = `${__dirname}/_fixtures_`;
  const dirOfFormat = path.extname(before).substring(1);
  return [path.resolve(dirPath, dirOfFormat, before), path.resolve(dirPath, dirOfFormat, after), path.resolve(dirPath, 'results', result)];
};

const jsonTestFiles = [
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
];


test.each(jsonTestFiles)('diff (%p, %p)', (beforePath, afterPath, resultPath) => {
  const [before, after, result] = getPathOfFile(beforePath, afterPath, resultPath);
  expect(makeDiff(before, after)).toBe(fs.readFileSync(result, 'utf-8'));
});
