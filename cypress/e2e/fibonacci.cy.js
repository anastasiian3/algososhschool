import { BASE_URL } from '../../src/constants/url';
import { input_test, button_test } from '../../src/constants/data-tests';

const testData = ['1', '1', '2', '3', '5', '8', '13'];

describe('performing tests on fibonacci page', () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}fibonacci`);
    cy.get(input_test).as('input');
    cy.get(button_test).as('button');
  });

  it('if an input is empty, button should be disabled', () => {
    cy.get('@input').clear();
    cy.get('@button').should('be.disabled');
  });

  it('test if fibonacci algorithm works correctly', () => {
    cy.get('@input').type('6');
    cy.get('@button').click();
    cy.get('[class^=circle_circle]')
      .should('have.length', testData.length)
      .each((number, index) => {
        expect(number).to.have.text(testData[index]);
      });
  });
});
