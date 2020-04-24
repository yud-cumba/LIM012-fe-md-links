//API
const fs = require('fs');
const path = require('path');

const pathIntroduced =  '../../../Programacion/ParaProbar'
//const absolutePath = '/home/yudith/Documentos/Programacion/ParaProbar';

//const ruta = path.resolve(relativePath);

const promise = new Promise ( (resolve,rejected) => {

    const absolutePath = path.resolve(pathIntroduced);
    const extensionPath = path.extname(absolutePath);
});
//console.log(promise);
//const mdLinks = (pathIntroduced) => promise ;
