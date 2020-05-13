const jest = require('jest');

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

const getInfoLinks = jest.fn().mockReturnValue(validateOff);

const appFunctions = jest.mock('../app_funtions', () => ({
  getInfoLinks,
}));

module.exports = {
  appFunctions,
};
