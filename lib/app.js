const fs = require('fs');
const path = require('path');
const marked = require('marked');
const jsdom = require('jsdom');
const fetch = require('node-fetch');

const { JSDOM } = jsdom;

const relativeRute = '../../../Programacion/ParaProbar';

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
        file: fileMd,
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
  const arrayPromise = arrayOfLinks.map(element => new Promise((resolve) => {
    return fetch(element.href)
      .then((resp) => {
        element.status = resp.status;
        element.status_text = resp.statusText;
        resolve(element);
      })
      .catch(() => {
        element.status_text = 'Not found';
        resolve(element);
      });
  }));
  return Promise.all(arrayPromise).then((resp) => resp);
};


const mdLinks = (pathIntroduced, options) => new Promise((resolve) => {
  const arrayOfLinks = getInfoLinks(pathIntroduced);
  if (options.validate === true) {
    return addStatus(arrayOfLinks).then((response) => resolve(response));
  }
});

module.exports = {
  mdLinks,
};
