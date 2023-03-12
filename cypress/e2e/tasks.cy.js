/// <reference types = "Cypress"/>

describe('tasks management', () => {
    it('should open and close tasks modal', () => {
        cy.visit('http://localhost:5173');
        cy.contains('Add Task').click();
        cy.get('.backdrop').click({force: true});
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');

        cy.contains('Add Task').click();
        cy.contains('Cancel').click();
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should create new task', () => {
        cy.visit('http://localhost:5173');
        cy.contains('Add Task').click();
        cy.get('#title').type('New task');
        cy.get('#summary').type('New summary');
        cy.get('.modal').contains('Add Task').click();        
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
        cy.get('.task').should('have.length', 1);
        cy.get('.task h2').contains('New task');
        cy.get('.task p').contains('New summary');
    });

    it('should validate user input', () => {
        cy.visit('http://localhost:5173');
        cy.contains('Add Task').click();
        cy.get('.modal').contains('Add Task').click();
        cy.contains('Please provide values for task title, summary and category!');
    });

    it('sholude filter task', () => {
        cy.visit('http://localhost:5173');
        cy.contains('Add Task').click();
        cy.get('#title').type('New task');
        cy.get('#summary').type('New summary!');
        cy.get('#category').select('urgent');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.modal').should('not.exist');
        cy.get('.backdrop').should('not.exist');
        cy.get('#filter').select('urgent');
        cy.get('.task').should('have.length', 1);
        cy.get('.task h2').contains('New task');
        cy.get('.task p').contains('New summary');
        
        cy.get('#filter').select('all');
        cy.get('.task').should('have.length', 1);
        cy.get('.task h2').contains('New task');
        cy.get('.task p').contains('New summary');
        
        cy.get('#filter').select('important');
        cy.get('.task').should('not.exist');
        cy.contains('No tasks found');
    });

    it('should add multiple tasks', () => {
        cy.visit('http://localhost:5173');
       
        cy.contains('Add Task').click();
        cy.get('#title').type('New task 1');
        cy.get('#summary').type('New summary 1!');
        cy.get('#category').select('urgent');
        cy.get('.modal').contains('Add Task').click();
        
        cy.contains('Add Task').click();
        cy.get('#title').type('New task 2');
        cy.get('#summary').type('New summary 2!');
        cy.get('#category').select('important');
        cy.get('.modal').contains('Add Task').click();
        
        cy.contains('Add Task').click();
        cy.get('#title').type('New task 3');
        cy.get('#summary').type('New summary 3!');
        cy.get('#category').select('moderate');
        cy.get('.modal').contains('Add Task').click();
        
        cy.contains('Add Task').click();
        cy.get('#title').type('New task 4');
        cy.get('#summary').type('New summary 4!');
        cy.get('#category').select('low');
        cy.get('.modal').contains('Add Task').click();

        cy.get('#filter').select('all');
        cy.get('.task').should('have.length', 4);
        cy.get('.task').first().contains('1');
        cy.get('.task').eq(1).contains('2');
        cy.get('.task').eq(2).contains('3');
        cy.get('.task').last().contains('4');        
    });
});
