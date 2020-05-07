const { mdLinks } = require('../lib/app.js');

jest.setTimeout(50000);

const validateOff = [
  { text: 'Hola', href: 'https://hola.xp', file: 'README3.md' },
  { text: 'JW', href: 'https://www.jw.org', file: 'README2.md' },
  { text: 'JW', href: 'https://www.jw.org', file: 'README2.md' },
  {
    text: 'Wikipedia',
    href: 'https://es.wikipedia.org/wiki/Markdown',
    file: 'README.md',
  },
  { text: 'Node.js', href: 'https://nodejs.org/', file: 'README.md' },
  {
    text: 'Github Yud',
    href: 'https://github.com/yud.cumba/md-links',
    file: 'README.md',
  },
];

const validateOn = [
  {
    text: 'Hola',
    href: 'https://hola.xp',
    file: 'README3.md',
    status: '',
    status_text: 'Not found',
  },
  {
    text: 'JW',
    href: 'https://www.jw.org',
    file: 'README2.md',
    status: 200,
    status_text: 'ok',
  },
  {
    text: 'JW',
    href: 'https://www.jw.org',
    file: 'README2.md',
    status: 200,
    status_text: 'ok',
  },
  {
    text: 'Wikipedia',
    href: 'https://es.wikipedia.org/wiki/Markdown',
    file: 'README.md',
    status: 200,
    status_text: 'ok',
  },
  {
    text: 'Node.js',
    href: 'https://nodejs.org/',
    file: 'README.md',
    status: 200,
    status_text: 'ok',
  },
  {
    text: 'Github Yud',
    href: 'https://github.com/yud.cumba/md-links',
    file: 'README.md',
    status: 404,
    status_text: 'fail',
  },
];

describe('Test de la función mdLinks con carpeta paraProbar ', () => {
  it('deberia ser una funcion', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('deberia retornar un objeto de mdLinks con carpeta absoluta ', () => mdLinks('./test/paraProbar', { validate: true })
    .then((link) => expect(typeof link).toBe('object')));

  it('Prueba con carpeta relativa paraProbar y validate: false', () => mdLinks('./test/paraProbar', { validate: false })
    .then((link) => expect(link).toEqual(validateOff)));

  it('Prueba con carpeta paraProbar y validate: true', () => mdLinks('./test/paraProbar', { validate: true })
    .then((link) => expect(link).toStrictEqual(validateOn)));

  it('mdLinks("./test/paraProbr") sin segundo parámetro', () => mdLinks('./test/paraProbar')
    .then((link) => expect(link).toEqual(validateOff)));

  it('mdLinks("./test/paraProbar/cipher.js") sin segundo parámetro', () => mdLinks('./test/paraProbar/cipher.js')
    .then((link) => expect(link.length).toEqual(0)));

  it('mdLinks("./test/paraProbarVacio") sin segundo parámetro', () => mdLinks('./test/paraProbarVacio')
    .then((link) => expect(link.length).toEqual(0)));

  it('Prueba con carpeta inválida', () => mdLinks('./test/paraProbr', { validate: false })
    .catch((err) => expect(err).toMatch('./test/paraProbr is not a valid path, please try again')));

  it('mdLinks("./test/paraProbar", true) con segundo parámetro inválido', () => mdLinks('./test/paraProbar', true)
    .catch((err) => expect(err).toMatch('Parámetro inválido')));
});
