#!/usr/bin/env node

const process = require('process');
const chalk = require('chalk'); //le da colores
const { mdLinks } = require('./app');

const error = chalk.bold.red;

const stats = (links) => {
  const uniqueLinks = [];
  links.forEach((link) => uniqueLinks.push(link.href));
  const stat = {
    total: links.length,
    unique: (uniqueLinks.filter((item, index, array) => array.indexOf(item) === index)).length,
  };
  return stat;
};

const validateStats = (links) => {
  const stat = stats(links);
  stat.broken = (links.filter((item) => item.status_text === 'fail')).length;
  return stat;
};

// Para ingresar desde consola node md-Links path --option --status
const path = process.argv[2];
const options = process.argv[3];
const status = process.argv[4];

const cliOptions = () => {
  if ((options === '--validate' && status === '--stats') || (options === '--stats' && status === '--validate')) {
    console.log(chalk.cyan.bold('Validate & stats: \n'));
    mdLinks(path, { validate: true })
      .then((links) => {
        if (links.length === 0) console.log(error('No hay archivos md. que analizar\n'));
        console.log(`Total : ${validateStats(links).total}\nUnique: ${validateStats(links).unique}\nBroken: ${validateStats(links).broken}\n`);
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
        console.log(`Total : ${stats(links).total}\nUnique: ${stats(links).unique}\n`);
      })
      .catch(console.error);
  } else {
    console.log(error('Invalidate option!\n'));
    console.log(chalk.black.bgCyanBright.bold('You can choose:                                             '));
    console.log(chalk.black.bgCyanBright.bold('--validate: Show links found are valid or not.              '));
    console.log(chalk.black.bgCyanBright.bold('--stats: Shows the number of total and unique links found.  '));
    console.log(chalk.black.bgCyanBright.bold('\nYou can also combine both options,                          '));
    console.log(chalk.black.bgCyanBright.bold('it shows the number of total, unique and broken links found.\n'));
  }
};
console.log(`\n${chalk.underline.blue.bold('Welcome to md-links!')} \n`);
if (options) {
  cliOptions();
} else {
  mdLinks(path, { validate: false })
    .then((link) => console.table(link))
    .catch(console.error);
}
module.exports = { stats, validateStats };
