describe('user crud tests', () => {
	beforeEach(() => {
		cy.logout();
		cy.login('admin', 'admin');
		cy.visit('http://localhost:3000/user');
	});

	describe('successful operations', () => {
		const testName = 'AA_test';
		it('should add a user', () => {
			cy.intercept(
				'GET',
				'http://localhost:3000/api/users',
				{ fixture: 'users.json' },
			);
			// cy.contains('Username').click();
			cy.get('[data-cy=add_user_button]').click();

			cy.get('[data-cy=username_input]').type(testName);
			cy.get('[data-cy=password_input]').type(testName);
			cy.get('[data-cy=email_input]').type(`${testName}@mail.com`);

			cy.get('[data-cy=confirm_user_creation_button]').click();

			cy.contains('Username').click();
			cy.contains(`${testName}@mail.com`);
		});

		it('should update a user', () => {
			cy.contains('Username').click();

			cy.get(`[data-cy=update_${testName}_button]`).click();
			cy.get('[data-cy=email_input]').clear().type(`${testName}_updated@mail.com`);
			cy.get('[data-cy=confirm_user_creation_button]').click();

			cy.contains('Username').click();
			cy.contains(`${testName}_updated@mail.com`);
		});

		it('should remove a user', () => {
			cy.contains('Username').click();

			cy.get(`[data-cy=delete_${testName}_button]`).click();
			cy.contains('test@mail.com').should('not.exist');
		});
	});

	// describe('unsuccessful operations', () => {
	// 	const testName = 'test';
	// 	it('should not add a duplicate user', () => {
	// 		cy.get('[data-cy=add_user_button]').click({ force: true });
	// 		cy.get('[data-cy=username_input]').type(testName);
	// 		cy.get('[data-cy=password_input]').type(testName);
	// 		cy.get('[data-cy=email_input]').type(`${testName}@mail.com`);
	// 		cy.get('[data-cy=confirm_user_creation_button]').click();

	// 		cy.get('[data-cy=add_user_button]').click({ force: true });
	// 		cy.get('[data-cy=username_input]').type(testName);
	// 		cy.get('[data-cy=password_input]').type(testName);
	// 		cy.get('[data-cy=email_input]').type(`${testName}@mail.com`);
	// 		cy.get('[data-cy=confirm_user_creation_button]').click();
	// 		cy.contains('Duplicate user');
	// 	});
	// });
});
