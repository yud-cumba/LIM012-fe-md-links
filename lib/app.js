const fs = require('fs');
const path = require('path');
const marked = require('marked');
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const relativeRute = '../../../Programacion/ParaProbar';
const ruta = path.resolve(relativeRute);
let arrayOfLinks = [];

const getLinks = (fileMd) => {
  console.log(fileMd);
  let textOfFile = fs.readFileSync(fileMd).toString();
  let markedToHtml = marked(textOfFile);
  //console.log(markedToHtml);
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
searchArchivesMd(ruta);

const promise = new Promise((resolve) => {
  resolve(arrayOfLinks);
});

const mdLinks = (pathIntroduced , options) => {

};

//getLinks('/home/yudith/Documentos/Programacion/ParaProbar/README.md');
//arrayLinksInfo.forEach(e => console.log(e.file));
console.log(promise);