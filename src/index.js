import conversionToObj from './parsers.js';
import makeAst from './ast.js';
import render from './formatters/index.js';

const makeDiff = (beforeFile, afterFile, format) => {
  const firstObj = conversionToObj(beforeFile);
  const secondObj = conversionToObj(afterFile);

  const ast = makeAst(firstObj, secondObj);

  return render(ast, format);
};

export default makeDiff;
