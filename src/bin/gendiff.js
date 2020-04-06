#! /usr/bin/env node
import commander from 'commander';
import makeDiff from '..';

commander
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(makeDiff(firstConfig, secondConfig)));

commander.parse(process.argv);
