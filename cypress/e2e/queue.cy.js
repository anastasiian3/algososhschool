import { button_clear_test, button_delete_test, button_test, input_test } from '../../src/constants/data-tests';
import { BASE_URL } from '../../src/constants/url';

const testData = ['1', '2', '3', '4', '5'];

const addElementToQueue = (value) => {
  cy.get('@input').type(value);
  cy.get('@button').click();
  cy.get('[class*=circle_changing]').contains(value);
  cy.get('[class*=circle_default]').contains(value);
};

describe('performing tests on queue page', () => {
  before(() => {
    cy.visit(`${BASE_URL}queue`);
  });

  beforeEach(() => {
    cy.get(input_test).as('input');
    cy.get(button_test).as('button');
    cy.get(button_delete_test).as('button_delete');
    cy.get(button_clear_test).as('button_clear');
  });

  it('if an input is empty, button should be disabled', () => {
    cy.get('@input').clear();
    cy.get('@button').should('be.disabled');
  });

  it('queue clear button works correctly', () => {
    testData.forEach((item) => {
      addElementToQueue(item);
    });
    cy.get('@button_clear').click();
    testData.forEach(() => {
      cy.get('[class*=circle_default]').should('have.text', '');
    });
  });

  it('queue add button works correctly', () => {
    testData.forEach((item, index) => {
      addElementToQueue(item);
      cy.get('[class*=circle_content]').eq(index).should('contain', item);
      if (index === 0) {
        cy.get('[class*=circle_content]').eq(index).should('contain', 'top');
      } else if (index === testData.length - 1) {
        cy.get('[class*=circle_content]').eq(index).should('contain', 'tail');
      }
    });
  });

  it('queue delete button works correctly', () => {
    testData.forEach((index) => {
      cy.get('@button_delete').click();
      cy.get('[class*=circle_letter]')
        .eq(index - 1)
        .should('have.text', '');
      if (index < testData.length) {
        cy.get('[class*=circle_content]').eq(index).should('contain', 'top');
      }
    });
  });
});
