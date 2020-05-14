#!/usr/bin/env node

const process = require('process');
const chalk = require('chalk');
const cli = require('./cli_options');

const error = chalk.bold.red;

const message = () => {
  console.log(chalk.black.bgCyanBright.bold('You can choose:                                             '));
  console.log(chalk.black.bgCyanBright.bold('--validate: Show links found are valid or not.              '));
  console.log(chalk.black.bgCyanBright.bold('--stats: Shows the number of total and unique links found.  '));
  console.log(chalk.black.bgCyanBright.bold('You can also combine both options,                          '));
  console.log(chalk.black.bgCyanBright.bold('it shows the number of total, unique and broken links found.\n'));
};

const cliOptions = (path, options, status) => {
  if (options) {
    if ((options === '--validate' && status === '--stats') || (options === '--stats' && status === '--validate')) {
      console.log(chalk.cyan.bold('Validate & stats: \n'));
      mdLinks(path, { validate: true })
        .then((links) => {
          if (links.length === 0) console.log(error('No hay archivos md. que analizar\n'));
          console.log(`Total : ${cli.validateStats(links).total}\nUnique: ${cli.validateStats(links).unique}\nBroken: ${cli.validateStats(links).broken}\n`);
        })
        .catch(console.error);
    } else if (options === '--validate') {
      console.log(chalk.cyan.bold('Validate: \n'));
      mdLinks(path, { validate: true })
        .then((links) => {
          if (links.length === 0) console.log(error('No hay archivos md. que analizar\n'));
          else {
            console.table(links);
          }
        })
        .catch(console.error);
    } else if (options === '--stats') {
      console.log(chalk.cyan.bold('Stats: \n'));
      mdLinks(path, { validate: true })
        .then((links) => {
          if (links.length === 0) console.log(error('No hay archivos md. que analizar\n'));
          console.log(`Total : ${cli.stats(links).total}\nUnique: ${cli.stats(links).unique}\n`);
        })
        .catch(console.error);
    } else {
      console.log(error('Invalidate option!\n'));
      message();
    }
  } else {
    mdLinks(path)
      .then((links) => {
        if (links.length === 0) console.log(error('No hay archivos md. que analizar\n'));
        else {
          console.table(links);
        }
      })
      .catch(console.error);
  }
};
console.log(`\n${chalk.underline.blue.bold('Welcome to md-links!')} \n`);
if (process.argv[2]) cliOptions(process.argv[2], process.argv[3], process.argv[4]);
else message();
