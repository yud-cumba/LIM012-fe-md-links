//CLI
const { mdLinks } = require('./app');
mdLinks('/home/yudith/Documentos/Programacion/ParaProbar', {validate: true}).then( links => {
  console.log(links);
});