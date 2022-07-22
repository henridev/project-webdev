describe('auth tests', () => {
	beforeEach(() => {
		cy.logout();
	});
	it('should login a user', () => {
		cy.login('admin', 'admin');
	});
});
