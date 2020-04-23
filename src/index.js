import fs from 'fs';
import path from 'path';
import conversionToObj from './parsers.js';
import genAst from './ast.js';
import render from './formatters/index.js';

const genDiff = (firstFileName, secondFileName, format) => {
  const getFileData = (fileName) => fs.readFileSync(path.resolve(process.cwd(), fileName), 'UTF-8');

  const firstFileData = getFileData(firstFileName);
  const secondFileData = getFileData(secondFileName);


  const firstObj = conversionToObj(firstFileData, path.extname(firstFileName));
  const secondObj = conversionToObj(secondFileData, path.extname(secondFileName));

  const ast = genAst(firstObj, secondObj);

  return render(ast, format);
};

export default genDiff;
