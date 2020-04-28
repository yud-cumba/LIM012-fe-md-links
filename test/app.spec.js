const main = require('../src/main');

describe('Test de la función convertAbsolutePath', () => {
  it('deberia ser una funcion', () => {
    expect(typeof main.convertAbsolutePath).toBe('function');
    
  });

  // more test
  it('debería retornar /Pr/Para para C:\temp\a\b\bb\tmp.txt', () => {
    expect(main.convertAbsolutePath('../../bb/tmp.txt')).toBe('C:\temp\a\b\bb\tmp.txt');
  });

});

describe('Test de la función searchArchives', () => {
  it('deberia ser una funcion', () => {
    expect(typeof main.searchArchives).toBe('function');
  });

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