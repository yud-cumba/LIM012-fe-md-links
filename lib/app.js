const fs = require('fs');
const functions = require('./app_functions');

const mdLinks = (pathIntroduced, options) => new Promise((resolve, reject) => {
  if (fs.existsSync(pathIntroduced)) {
    const arrayOfLinks = functions.getInfoLinks(pathIntroduced);
    if (options === undefined || options.validate === false) {
      resolve(arrayOfLinks);
    } else if (options.validate === true) {
      return functions.addStatus(arrayOfLinks).then((links) => resolve(links));
    } else reject((new Error('Parámetro inválido')).message);
  } else {
    const error = new Error(`${pathIntroduced} is not a valid path, please try again.\n`);
    reject(error.message);
  }
});

module.exports = {
  mdLinks,
};
