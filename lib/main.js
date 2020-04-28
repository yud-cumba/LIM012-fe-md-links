//CLI
const { mdLinks } = require('./app');
mdLinks('/home/yudith/Documentos/Programacion/ParaProbar', true).then( links => {
  console.log(links);
});

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