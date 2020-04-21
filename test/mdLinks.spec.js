const mdLinks = require('../src/mdLinks');

describe('Test de la función basic',  () => {
  it('deberia ser una funcion', () => {
    expect(typeof mdLinks.basic).toBe('function');
  });
  // more test
});

describe('Test de la función validateLinks',  () => {
  it('deberia ser una funcion', () => {
    expect(typeof mdLinks.validateLinks).toBe('function');
  });

  // more test
});

describe('Test de la función statsLinks',  () => {
  it('deberia ser una funcion', () => {
    expect(typeof mdLinks.statsLinks).toBe('function');
  });

  // more test
});

describe('Test de la función validateStatsLinks',  () => {
  it('deberia ser una funcion', () => {
    expect(typeof mdLinks.validateStatsLinks).toBe('function');
  });

  // more test
});