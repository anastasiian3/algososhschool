import { StateColours } from '../../src/constants/data-tests';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { BASE_URL } from '../../src/constants/url';

const testData = ['0', '97', '81', '17'];
const testDataToAdd = 'hi';

const checkIfListIsCorrect = (length) => {
  cy.wait(SHORT_DELAY_IN_MS);
  cy.get('[class*=circle_content]').should('have.length', length);
  cy.get('[class*=circle_content]').first().should('contain', 'head');
  cy.get('[class*=circle_content]').last().should('contain', 'tail');
};

const addElement = (button) => {
  cy.get('@input_value').type(testDataToAdd);
  cy.get(button).should('not.be.disabled');
  cy.get(button).click();
  cy.get('[class*=circle_small]').contains(testDataToAdd);
  cy.wait(SHORT_DELAY_IN_MS);
  cy.get('[class*=circle_circle]').contains(testDataToAdd);
  checkIfListIsCorrect(5);
  cy.get('[class*=circle_default]').contains(testDataToAdd);
};

const deleteElement = (button, index) => {
  cy.get(button).should('not.be.disabled');
  cy.get(button).click();
  cy.get('[class*=circle_small]').contains(testDataToAdd);
  cy.wait(SHORT_DELAY_IN_MS);
  cy.get('[class*=circle_circle]').contains(testDataToAdd);
  checkIfListIsCorrect(4);
  cy.get('[class*=circle_default]').contains(testData[index]);
};

describe('performing tests on list page', () => {
  before(() => {
    cy.visit(`${BASE_URL}list`);
  });

  beforeEach(() => {
    cy.get("[data-testid='input-value']").as('input_value');
    cy.get("[data-testid='button-add-to-head']").as('button_add_to_head');
    cy.get("[data-testid='button-add-to-tail']").as('button_add_to_tail');
    cy.get("[data-testid='button-delete-from-head']").as('button_delete_from_head');
    cy.get("[data-testid='button-delete-from-tail']").as('button_delete_from_tail');
    cy.get("[data-testid='input-index']").as('input_index');
    cy.get("[data-testid='button-add-by-index']").as('button_add_by_index');
    cy.get("[data-testid='button-delete-by-index']").as('button_delete_by_index');
  });

  it('if an input value is empty, buttons should be disabled', () => {
    cy.get('@input_value').clear();
    cy.get('@button_add_to_head').should('be.disabled');
    cy.get('@button_add_by_index').should('be.disabled');
    cy.get('@button_delete_by_index').should('be.disabled');
  });

  it('if an input index is empty, buttons should be disabled', () => {
    cy.get('@input_index').clear();
    cy.get('@button_add_by_index').should('be.disabled');
    cy.get('@button_delete_by_index').should('be.disabled');
  });

  it('default list should render in a correct way', () => {
    cy.get('[class*=circle_circle]').each((element, index) => {
      expect(element).to.have.text(testData[index]);
      expect(element).to.have.css('border-color', StateColours.Default);
    });
    checkIfListIsCorrect(4);
  });

  it('add element to head', () => {
    addElement('@button_add_to_head');
  });

  it('delete element from head', () => {
    deleteElement('@button_delete_from_head', 0);
  });

  it('add element to tail', () => {
    addElement('@button_add_to_tail');
  });

  it('delete element from tail', () => {
    deleteElement('@button_delete_from_tail', 3);
  });

  it('add element by index', () => {
    cy.get('@input_value').type(testDataToAdd);
    cy.get('@input_index').type('3');
    cy.get('@button_add_by_index').click();
    cy.wait(DELAY_IN_MS);
    checkIfListIsCorrect(5);
    cy.get('[class*=circle_changing]').contains(testDataToAdd);
    cy.get('[class*=circle_modified]').contains(testDataToAdd);
    cy.wait(DELAY_IN_MS);
    cy.get('[class*=circle_default]').contains(testDataToAdd);
    cy.get('[class*=circle_content]').eq(3).contains(testDataToAdd);
  });

  it('delete element by index', () => {
    cy.get('@input_index').type('3');
    cy.get('@button_delete_by_index').click();
    cy.wait(DELAY_IN_MS);
    checkIfListIsCorrect(4);
    cy.wait(DELAY_IN_MS);
    cy.get('[class*=circle_circle]').each((item, index) => {
      expect(item).to.have.text(testData[index]);
    });
  });
});
