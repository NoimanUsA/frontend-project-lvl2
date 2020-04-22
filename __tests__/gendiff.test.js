import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';


const getFilePath = (fileName) => {
  return path.resolve(`${__dirname}/__fixtures__/${path.extname(fileName).substring(1)}`, `${fileName}`);
};

const data = [
  ['before.json', 'after.json', 'results/treeResult'],
  ['before.yml', 'after.yml', 'results/treeResult'],
  ['before.ini', 'after.ini', 'results/treeResult'],
  ['before.json', 'after.json', 'results/plainResult', 'plain'],
  ['before.json', 'after.json', 'results/jsonResult', 'json'],
];


test.each(data)('diff(%p, %p)', (beforePath, afterPath, resultPath, format = 'tree') => {
  const [before, after, result] = [getFilePath(beforePath), getFilePath(afterPath), getFilePath(resultPath)];
  expect(genDiff(before, after, format)).toBe(fs.readFileSync(result, 'utf-8'));
});
