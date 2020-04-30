/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
// CLI
const process = require('process');
const chalk = require('chalk'); //le da colores
const { mdLinks } = require('./app');

const error = chalk.bold.red;
const warning = chalk.keyword('orange');

const stats = (links) => {
  const uniqueLinks = [];
  // eslint-disable-next-line guard-for-in
  // eslint-disable-next-line no-restricted-syntax
  for (const i in links) {
    uniqueLinks.push(links[i].href);
  }
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

console.log(`\n${chalk.underline.blue.bold('Welcome to md-links!')} \n`);
if ((options === '--validate' && status === '--stats') || (options === '--stats' && status === '--validate')) {
  console.log(chalk.cyan.bold('Validate & stats: \n'));
  mdLinks(path, { validate: true })
    .then((links) => {
      console.log(`Total : ${validateStats(links).total}\nUnique: ${validateStats(links).unique}\nBroken: ${validateStats(links).broken}`);
    });
} else if (options === '--validate') {
  console.log(chalk.cyan.bold('Validate: \n'));
  mdLinks(path, { validate: true })
    .then((links) => {
      // eslint-disable-next-line guard-for-in
      console.table(links);
    });
} else if (options === '--stats') {
  console.log(chalk.cyan.bold('Stats: \n'));
  mdLinks(path, { validate: true })
    .then((links) => {
      console.log(`Total : ${stats(links).total}\nUnique: ${stats(links).unique}`);
    });
} else {
  console.log(error('Invalidate option!\n'));
  console.log(chalk.black.bgCyanBright.bold('You can choose:                                             '));
  console.log(chalk.black.bgCyanBright.bold('--validate: Show links found are valid or not.              '));
  console.log(chalk.black.bgCyanBright.bold('--stats: Shows the number of total and unique links found.  '));
  console.log(chalk.black.bgCyanBright.bold('\nYou can also combine both options,                          '));
  console.log(chalk.black.bgCyanBright.bold('it shows the number of total, unique and broken links found.\n'));
}

module.exports = { stats, validateStats };
