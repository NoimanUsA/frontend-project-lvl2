import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parseFunctions = {
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

export default (fileName) => {
  const filePath = fs.readFileSync(path.resolve(process.cwd(), fileName), 'UTF-8');
  const fileFormat = path.extname(fileName);
  return parseFunctions[fileFormat](filePath);
};
