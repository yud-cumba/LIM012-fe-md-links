const main = require('../lib/app.js');


describe('Test de la función searchArchives', () => {
  it('deberia ser una funcion', () => {
    expect(typeof main.searchArchives).toBe('function');
  });
  it('');
  // more test
});

describe('Test de la función getContent', () => {
  it('deberia ser una funcion', () => {
    expect(typeof main.getContent).toBe('function');
  });

  // more test
});

describe('Test de la función getLinks',  () => {
  it('deberia ser una funcion', () => {
    expect(typeof main.getLinks).toBe('function');
  });

  // more test
});