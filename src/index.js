import conversionToObj from './parsers.js';
import genAst from './ast.js';
import render from './formatters/index.js';

const genDiff = (firstFileName, secondFileName, format) => {
  const firstObj = conversionToObj(firstFileName);
  const secondObj = conversionToObj(secondFileName);

  const ast = genAst(firstObj, secondObj);

  return render(ast, format);
};

export default genDiff;
