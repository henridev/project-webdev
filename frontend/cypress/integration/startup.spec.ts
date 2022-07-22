describe('basic tests', () => {
	it('runs the app', () => {
		cy.visit('http://localhost:3000');
	});

	it('changes the app theme', () => {
		cy.visit('http://localhost:3000');
		cy.get('body').then(($el) => {
			const classList = Array.from($el[0].classList);
			const isLight = classList.includes('chakra-ui-light');
			cy.get('[data-cy=toggle-theme]').should('exist').click();
			cy.get('body').should('have.class', isLight ? 'chakra-ui-dark' : 'chakra-ui-light');
		});
	});
});
