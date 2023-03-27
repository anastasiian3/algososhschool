import { BASE_URL } from '../../src/constants/url';

describe('app runs on localhost:3000', function () {
  it('should be available on localhost:3000', function () {
    cy.visit(BASE_URL);
  });
});
