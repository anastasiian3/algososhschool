import {
  button_clear_test,
  button_delete_test,
  button_test,
  input_test,
  StateColours,
} from '../../src/constants/data-tests';
import { BASE_URL } from '../../src/constants/url';

const testData = [
  [{ value: '1', state: StateColours.Changing }],
  [
    { value: '1', state: StateColours.Default },
    { value: '2', state: StateColours.Changing },
  ],
  [
    { value: '1', state: StateColours.Default },
    { value: '2', state: StateColours.Default },
    { value: '3', state: StateColours.Changing },
  ],
  [
    { value: '1', state: StateColours.Default },
    { value: '2', state: StateColours.Default },
    { value: '3', state: StateColours.Default },
    { value: '4', state: StateColours.Changing },
  ],
];

describe('performing tests on stack page', () => {
  before(() => {
    cy.visit(`${BASE_URL}stack`);
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

  it('stack clear button works correctly', () => {
    testData.forEach((symbol, index) => {
      cy.get('@input').type(symbol[index].value);
      cy.get('@button').should('not.be.disabled');
      cy.get('@button').click();
    });
    cy.get('@button_clear').click();
    testData.forEach(() => {
      cy.get('[class^=circle_content]').should('have.length', '0');
    });
  });

  it('stack algorithm works correctly', () => {
    testData.forEach((symbol, index) => {
      cy.get('@input').type(symbol[index].value);
      cy.get('@button').click();
      cy.get('[class^=circle_circle]')
        .should('have.length', index + 1)
        .each((letter, index) => {
          expect(letter).to.have.text(symbol[index].value);
          expect(letter).to.have.css('border-color', symbol[index].state);
        });
    });
  });

  it('stack delete button works correctly', () => {
    const reversedTestData = testData.reverse();
    reversedTestData.forEach((symbol, index) => {
      cy.get('@button_delete').click();
      cy.get('[class^=circle_circle]')
        .should('have.length', reversedTestData.length - index)
        .each((letter, index) => {
          expect(letter).to.have.text(symbol[index].value);
          expect(letter).to.have.css('border-color', symbol[index].state);
        });
    });
  });
});
