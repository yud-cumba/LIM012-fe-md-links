const fs = require('fs');
const path = require('path');
const marked = require('marked');
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const relativeRute = '../../../Programacion/ParaProbar';
const ruta = path.resolve(relativeRute);
let text=[];
let href=[];
let file=[];

const getLinks = (fileMd) => {
  let textOfFile = fs.readFileSync(fileMd).toString();
  let markedToHtml = marked(textOfFile);
  console.log(markedToHtml);
  const dom = new JSDOM(markedToHtml);
  dom.window.document.querySelectorAll('a').forEach( e => {
    text.push(e.textContent);
    href.push(e.getAttribute('href'));
    file.push(fileMd);
  });
};


const searchArchivesMd = (absolutePath) => {
  const isDirectory = fs.lstatSync(absolutePath).isDirectory();
  const isArchiveMd = (path.extname(absolutePath) === '.md');
  if (isArchiveMd) getLinks(absolutePath);
  else if (isDirectory) {
    const filesInDirectory = fs.readdirSync(absolutePath);
    filesInDirectory.forEach((files) => {
      searchArchivesMd(`${absolutePath}/${files}`);
    });
  }
};

getLinks('/home/yudith/Documentos/Programacion/ParaProbar/README.md');
console.log(text);
console.log(href);
console.log(file);
//searchArchivesMd(ruta);
//console.log(linksInfo);




















/*module.exports = {
    validateLinks : () => {

    },

    statsLinks : () => {

    },

    validateStatsLinks : () => {

    },

    basic : () => {

    },
    convertAbsolutePath : () => {
        return 'hola Mundo';
    },

    searchArchives : () => {

    },

    getContent : () => {

    },

    getLinks : () => {

    }
}*/