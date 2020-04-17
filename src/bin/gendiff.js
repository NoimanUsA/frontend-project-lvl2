#! /usr/bin/env node
import commander from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

commander
  .version(version)
  .option('-f, --format [type]', 'output format', 'tree')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(genDiff(firstConfig, secondConfig, commander.format)));

commander.parse(process.argv);
