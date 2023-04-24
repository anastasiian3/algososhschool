import { BASE_URL } from '../../src/constants/url';

describe('check if routes are okay', function () {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it('should open main page on default', () => {
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('should open string page after clicking on a string icon', () => {
    cy.visit(`${BASE_URL}recursion`);
    cy.contains('Строка');
  });

  it('should open fibonacci page after clicking on a fibonacci icon', () => {
    cy.visit(`${BASE_URL}fibonacci`);
    cy.contains('Последовательность Фибоначчи');
  });

  it('should open sorting page after clicking on a sorting icon', () => {
    cy.visit(`${BASE_URL}sorting`);
    cy.contains('Сортировка массива');
  });

  it('should open stack page after clicking on a stack icon', () => {
    cy.visit(`${BASE_URL}stack`);
    cy.contains('Стек');
  });

  it('should open queue page after clicking on queue icon', () => {
    cy.visit(`${BASE_URL}queue`);
    cy.contains('Очередь');
  });

  it('should open list page after clicking on a list icon', () => {
    cy.visit(`${BASE_URL}list`);
    cy.contains('Связный список');
  });
});
