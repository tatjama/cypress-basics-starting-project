/// <reference types = "Cypress"/>

describe('tasks page', () => {
  it('should render the main image', () => {
    cy.visit('http://127.0.0.1:5173/');
    cy.get('.main-header img');
    //cy.get('.main-header').find('img');// => also works
  })

  it('should display page title', () => {
    cy.visit('http://localhost:5173');
    cy.get('h1').should('have.length', 1);
    cy.get('h1').contains('My Cypress Course');
    //cy.contains('My Cypress Course');
  })
})