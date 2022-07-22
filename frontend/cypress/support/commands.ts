/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
	interface Chainable<Subject> {
		login(username: string, password: string): Chainable<any>
		logout(): Chainable<any>
	}
}

const login = (email: string, password: string) => {
	cy.intercept('api/auth/login').as('login');

	cy.visit('http://localhost:3000');

	cy.get('[data-cy=user_button]').click();
	cy.get('[data-cy=login_button]').click();

	cy.get('[data-cy=username_input]').type(email);
	cy.get('[data-cy=password_input]').type(password);

	cy.get('[data-cy=login_submit_button]').click();

	cy.wait('@login');
};

Cypress.Commands.add('login', (email: string, password: string) => cy.wrap(login(email, password)));

const logout = () => {
	cy.visit('http://localhost:3000');
	cy.get('[data-cy=user_button]').click();
	cy.get('body').then(($body) => {
		if ($body.find('button[data-cy=logout_button]').length > 0) {
			// evaluates as true
			cy.log('logout..');
			cy.get('[data-cy=logout_button]').click();
		}
	});
};

Cypress.Commands.add('logout', () => cy.wrap(logout()));
