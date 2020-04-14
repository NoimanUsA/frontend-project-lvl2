import renderTree from './renderTree';
import renderPlain from './renderPlain';

export default (ast, format) => {
  const renderTypes = {
    tree: renderTree,
    plain: renderPlain
  };

  return renderTypes[format](ast);
};
