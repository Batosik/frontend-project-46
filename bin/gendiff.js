#!/usr/bin/env node
import { Command } from 'commander';
import { cwd } from 'node:process';
import * as fs from 'node:fs';
import * as path from 'node:path';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    // выделить в модуль. £3 Поддержка форматов.
    const absfile1path = path.resolve(filepath1);
    const absfile2path = path.resolve(filepath2);
    const file1 = fs.readFileSync(absfile1path, { encoding: 'utf-8' });
    const file2 = fs.readFileSync(absfile2path, { encoding: 'utf-8' });
    const parseFile1 = JSON.parse(file1);
    const parseFile2 = JSON.parse(file2);
  });

program.parse();
