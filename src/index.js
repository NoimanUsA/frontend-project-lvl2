import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import genAst from './ast.js';
import render from './formatters/index.js';

const genDiff = (firstFilePath, secondFilePath, format) => {
  const getFileData = (fileName) => fs.readFileSync(path.resolve(process.cwd(), fileName), 'UTF-8');

  const firstFileData = getFileData(firstFilePath);
  const secondFileData = getFileData(secondFilePath);


  const firstObj = parse(firstFileData, path.extname(firstFilePath).slice(1));
  const secondObj = parse(secondFileData, path.extname(secondFilePath).slice(1));

  const ast = genAst(firstObj, secondObj);

  return render(ast, format);
};

export default genDiff;
