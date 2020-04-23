import yaml from 'js-yaml';
import ini from 'ini';

const parseFunctions = {
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

export default (fileData, ext) => parseFunctions[ext](fileData);
