const { mdLinks } = require('./app');
const stats = (links)=> {
    const uniqueLinks = [];
    for (const i in links) {
      uniqueLinks.push(links[i].href);
    }
    const stat = {
        total : links.length,
        unique: (uniqueLinks.filter((item, index, array) => array.indexOf(item) === index)).length,
    }
    return stat;
};

const validateStats = (links) => {
    const stat = stats(links);
    stat.broken = (links.filter((item) => item.status_text === 'fail')).length;
return stat;
};

mdLinks('/home/yudith/Documentos/Programacion/ParaProbar', { validate: false }).then((links) => {
  
console.log(`Total : ${links.length} \nUnique: ${unique}`);
  });

mdLinks('/home/yudith/Documentos/Programacion/ParaProbar', { validate: true}).then((links) => {
  for (const i in links){
    console.log(`${links[i].file} ${links[i].href} ${links[i].status_text} ${links[i].status} ${links[i].text}`);
  }
});

mdLinks('/home/yudith/Documentos/Programacion/ParaProbar', { validate: true}).then((links) => {
    const broken = links.filter((item) => item.status_text === 'fail');

  });