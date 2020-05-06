const cli = require('../lib/cli.js');

const objectStats = [
  {
    text: 'Wikipedia',
    href: 'https://es.wikipedia.org/wiki/Markdown',
    file: '../README.md',
  },
  {
    text: 'Node.js',
    href: 'https://nodejs.org/',
    file: '../README.md',
  },
  {
    text: 'Github Yud',
    href: 'https://github.com/yud.cumba/md-links',
    file: '../README.md',
  },
  {
    text: 'JW',
    href: 'https://www.jw.org',
    file: '../README2.md',
  },
  {
    text: 'JW',
    href: 'https://www.jw.org',
    file: '../README2.md',
  },
  {
    text: 'Hola',
    href: 'https://hola.xp',
    file: '../../README3.md',
  },
];

const objectValidateStats = [{
  text: 'Wikipedia',
  href: 'https://es.wikipedia.org/wiki/Markdown',
  file: '../README.md',
  status: 200,
  status_text: 'ok',
},
{
  text: 'Node.js',
  href: 'https://nodejs.org/',
  file: '../README.md',
  status: 200,
  status_text: 'ok',
},
{
  text: 'Github Yud',
  href: 'https://github.com/yud.cumba/md-links',
  file: '../README.md',
  status: 404,
  status_text: 'fail',
},
{
  text: 'JW',
  href: 'https://www.jw.org',
  file: '../README2.md',
  status: 200,
  status_text: 'ok',
},
{
  text: 'JW',
  href: 'https://www.jw.org',
  file: '../README2.md',
  status: 200,
  status_text: 'ok',
},
{
  text: 'Hola',
  href: 'https://hola.xp',
  file: '../../README3.md',
  status: '',
  status_text: 'Not found',
}];

describe('Test para stats', () => {
  it('Debería ser una función', () => {
    expect(typeof cli.stats).toBe('function');
  });

  it('Debería retornar un objeto', () => {
    expect(typeof cli.stats(objectStats)).toBe('object');
  });

  it('Usando la carpeta paraProbar, debería retornar 6 links en total', () => {
    expect(cli.stats(objectStats).total).toEqual(6);
  });
  it('Usando la carpeta paraProbar, debería retornar 5 links únicos', () => {
    expect(cli.stats(objectStats).unique).toEqual(5);
  });
});

describe('Test para statsValidate', () => {
  it('Debería ser una función', () => {
    expect(typeof cli.validateStats).toBe('function');
  });

  it('Debería retornar un objeto', () => {
    expect(typeof cli.validateStats(objectValidateStats)).toBe('object');
  });

  it('Usando la carpeta paraProbar, debería retornar 6 links en total', () => {
    expect(cli.validateStats(objectValidateStats).total).toEqual(6);
  });

  it('Usando la carpeta paraProbar, debería retornar 5 links únicos', () => {
    expect(cli.validateStats(objectValidateStats).unique).toEqual(5);
  });

  it('Usando la carpeta paraProbar, debería retornar 1 link roto', () => {
    expect(cli.validateStats(objectValidateStats).broken).toEqual(1);
  });
});
