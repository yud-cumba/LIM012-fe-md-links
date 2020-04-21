const fs = require('fs');
const relativeRute =  '../../../Programacion/ParaProbar'
const absoluteRute = '/home/yudith/Documentos/Programacion/ParaProbar';
path = require('path');
const ruta = path.resolve(relativeRute);
console.log(ruta);
console.log(typeof ruta);

fs.readdir(ruta, (err, files) => {
    if(err) return console.error(err);
    console.log(files);
  });


console.log("Fin del progama")

module.exports = {
    convertAbsolutePath : () => {
        return 'hola Mundo';
    },

    searchArchives : () => {

    },

    getContent : () => {

    },

    getLinks : () => {

    }
} 