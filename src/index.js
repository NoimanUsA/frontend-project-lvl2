import conversionToObj from './parsers.js';
import genAst from './ast.js';
import render from './formatters/index.js';

const genDiff = (beforeFile, afterFile, format) => {
  const firstObj = conversionToObj(beforeFile);
  const secondObj = conversionToObj(afterFile);

  const ast = genAst(firstObj, secondObj);

  return render(ast, format);
};

export default genDiff;
