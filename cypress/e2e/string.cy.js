import { BASE_URL } from '../../src/constants/url';
import { input_test, button_test, StateColours } from '../../src/constants/data-tests';
import { DELAY_IN_MS } from '../../src/constants/delays';

const testData = [
  [
    { value: '1', state: StateColours.Changing },
    { value: '2', state: StateColours.Default },
    { value: '3', state: StateColours.Default },
    { value: '4', state: StateColours.Changing },
  ],
  [
    { value: '4', state: StateColours.Modified },
    { value: '2', state: StateColours.Changing },
    { value: '3', state: StateColours.Changing },
    { value: '1', state: StateColours.Modified },
  ],
  [
    { value: '4', state: StateColours.Modified },
    { value: '3', state: StateColours.Modified },
    { value: '2', state: StateColours.Modified },
    { value: '1', state: StateColours.Modified },
  ],
];

describe('performing tests on string page', () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}recursion`);
    cy.get(input_test).as('input');
    cy.get(button_test).as('button');
  });

  it('if an input is empty, button should be disabled', () => {
    cy.get('@input').clear();
    cy.get('@button').should('be.disabled');
  });

  it('reverse algorithm works correctly', () => {
    cy.get('@input').type('1234');
    cy.get('@button').click();
    testData.forEach((symbol) => {
      cy.get('[class^=circle_circle]').each((letter, index) => {
        expect(letter).to.have.text(symbol[index].value);
        expect(letter).to.have.css('border-color', symbol[index].state);
      });
      cy.wait(DELAY_IN_MS);
    });
  });
});
