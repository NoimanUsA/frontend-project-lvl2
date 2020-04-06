import conversionToObj from './parsers.js';
import makeAst from './ast.js';
import render from './renderers/tree.js';

const makeDiff = (beforeFile, afterFile) => {
  const firstObj = conversionToObj(beforeFile);
  const secondObj = conversionToObj(afterFile);
  return render(makeAst(firstObj, secondObj));
};

export default makeDiff;
