/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
// CLI
const process = require('process');
const { mdLinks } = require('./app');

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

if ((options === '--validate' && status === '--stats') || (options === '--stats' && status === '--validate')) {
  mdLinks(path, { validate: true })
    .then((links) => {
      console.log(`Total : ${validateStats(links).total}\nUnique: ${validateStats(links).unique}\nBroken: ${validateStats(links).broken}`);
    });
} else if (options === '--validate') {
  mdLinks(path, { validate: true })
    .then((links) => {
      // eslint-disable-next-line guard-for-in
      console.table(links);
    });
} else if (options === '--stats') {
  mdLinks(path, { validate: true })
    .then((links) => {
      console.log(`Total : ${stats(links).total}\nUnique: ${stats(links).unique}`);
    });
} else {
  console.log('ERROR');
}

module.exports = { stats, validateStats };
