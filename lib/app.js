/* eslint-disable no-unused-expressions */
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const jsdom = require('jsdom');
const fetch = require('node-fetch');

const { JSDOM } = jsdom;

const getInfoLinks = (pathIntroduced) => {
  const aboslutePathIntroduced = path.resolve(pathIntroduced);
  const arrayOfLinks = [];

  const getLinks = (fileMd) => {
    const textOfFile = fs.readFileSync(fileMd).toString();
    const markedToHtml = marked(textOfFile);
    const dom = new JSDOM(markedToHtml);
    dom.window.document.querySelectorAll('a').forEach((e) => {
      arrayOfLinks.push({
        text: e.textContent,
        href: e.getAttribute('href'),
        file: path.relative(fileMd, `/${path.basename(fileMd)}`),
      });
    });
  };


  const searchArchivesMd = (absolutePath) => {
    const isDirectory = fs.lstatSync(absolutePath).isDirectory();
    const isArchiveMd = (path.extname(absolutePath) === '.md');
    if (isArchiveMd) {
      getLinks(absolutePath);
    } else if (isDirectory) {
      const filesInDirectory = fs.readdirSync(absolutePath);
      filesInDirectory.forEach((files) => {
        searchArchivesMd(`${absolutePath}/${files}`);
      });
    }
  };
  searchArchivesMd(aboslutePathIntroduced);
  return arrayOfLinks;
};

const addStatus = (arrayOfLinks) => {
  const arrayPromise = arrayOfLinks.map((element) => new Promise((resolve) => fetch(element.href)
    .then((resp) => {
      // eslint-disable-next-line no-param-reassign
      element.status = resp.status;
      // eslint-disable-next-line no-param-reassign
      (resp.status >= 200 && resp.status < 400) ? element.status_text = 'ok' : element.status_text = 'fail';
      resolve(element);
    })
    .catch(() => {
      // eslint-disable-next-line no-param-reassign
      element.status = '';
      // eslint-disable-next-line no-param-reassign
      element.status_text = 'Not found';
      resolve(element);
    })));
  return Promise.all(arrayPromise).then((resp) => resp);
};

// eslint-disable-next-line consistent-return
const mdLinks = (pathIntroduced, options) => new Promise((resolve) => {
  const arrayOfLinks = getInfoLinks(pathIntroduced);
  if (options.validate === true) {
    return addStatus(arrayOfLinks).then((links) => resolve(links));
  }
  if (options.validate === false) {
    resolve(arrayOfLinks);
  }
});

module.exports = {
  mdLinks,
};
