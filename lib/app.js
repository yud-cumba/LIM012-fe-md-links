const fs = require('fs');
const path = require('path');
const marked = require('marked');
const jsdom = require("jsdom");
const fetch = require('node-fetch');

const { JSDOM } = jsdom;

const relativeRute = '../../../Programacion/ParaProbar';

const getInfoLinks = (pathIntroduced) => {
  let aboslutePathIntroduced = path.resolve(pathIntroduced);
  let arrayOfLinks = [];

  const getLinks = (fileMd) => {
    //console.log(fileMd);
    let textOfFile = fs.readFileSync(fileMd).toString();
    let markedToHtml = marked(textOfFile);
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

const addStatus = (objectOfUrl) => {
  fetch(objectOfUrl.href)
    .then((link) => {
      objectOfUrl.status = link.status;
      objectOfUrl.status_text = link.statusText;
      //console.log(objectOfUrl);
    }).catch(() => {
      objectOfUrl.status_text = 'Not found';
    });
};
//console.log(  getInfoLinks('../../../Programacion/ParaProbar'));
const objeto = {
  text: 'README2',
  href: 'https://www.jw.org',
  file: '/home/yudith/Documentos/Programacion/ParaProbar/carpeta interior/README2.md'
};
addStatus(objeto);
console.log(objeto);

const mdLinks = (pathIntroduced, options) => {
  arrayOfLinks = getInfoLinks(pathIntroduced);
  if (options) {
    arrayOfLinks.forEach((objectOfUrl) => addStatus(objectOfUrl));
    //console.log(arrayOfLinks);
  }
  return new Promise((resolve) => {
    //console.log('hola');
    //console.log(arrayOfLinks);
    resolve(arrayOfLinks);
  });
};

mdLinks('/home/yudith/Documentos/Programacion/ParaProbar', true);
/*module.exports = {
  mdLinks,
};*/