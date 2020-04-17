import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parseFunctions = {
  '.yaml': (filePath) => yaml.safeLoad(filePath),
  '.yml': (filePath) => yaml.safeLoad(filePath),
  '.json': (filePath) => JSON.parse(filePath),
  '.ini': (filePath) => ini.parse(filePath),
};

export default (file) => {
  const filePath = fs.readFileSync(path.resolve(process.cwd(), file), 'UTF-8');
  const fileFormat = path.extname(file);
  return parseFunctions[fileFormat](filePath);
};
