import renderTree from './renderTree';
import renderPlain from './renderPlain';


export default (ast, format) => {
  const renderTypes = {
    tree: renderTree,
    plain: renderPlain,
    json: JSON.stringify,
  };

  return renderTypes[format](ast);
};
