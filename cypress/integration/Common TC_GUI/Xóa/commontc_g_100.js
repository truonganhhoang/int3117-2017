describe('Confirm before delete', function() {

	it('Delete confirmation for Admin', function() {
		checkDeleteConfirm(0);
	})

	it('Delete confirmation for Agency admin', function() {
		checkDeleteConfirm(1);
	})

	it('Delete confirmation for Doctor', function() {
		checkDeleteConfirm(2);
	})

	it('Delete confirmation for Nurse', function() {
		checkDeleteConfirm(3)
	})

	it('Delete confirmation for Storekeeper', function() {
		checkDeleteConfirm(4)
	})

	it('Delete confirmation in common test', function() {
		cy.visit(Cypress.env('URL_LOGIN'));
		cy.get('input[name=email]').type('admin_10@gmail.com');
		cy.get('input[name=password]').type('Methadone@2017{enter}');

		cy.wait(1234);
		cy.visit(Cypress.env('URL_LOGIN') + '/common_test');

		if (Cypress.$('.fa-trash-o').length) {

			cy.get('tbody > tr:last-child .fa-trash-o:last-child').first().click();
			const nameToBeDeleted = Cypress.$('tbody > tr:last-child .fa-trash-o:last-child').first().text();
			
			cy.get('.bootbox-body').should('contain', 'Bạn chắc chắn muốn xóa "');
			cy.get('.bootbox-body').should('contain', nameToBeDeleted);
		}
	})
})

function checkDeleteConfirm(screenIndex) {
	cy.clearCookies();
	cy.visit(Cypress.env('URL_LOGIN'));

	cy.get('input[name=email]').type(Cypress.env('list_screen')[screenIndex].email);
	cy.get('input[name=password]').type('Methadone@2017{enter}');

	cy.wait(1234);

	var availableScreens = Cypress.env('list_screen')[screenIndex].availableScreens;
	for (var j = 0; j < availableScreens.length; ++j) {
		cy.visit(Cypress.env('URL_LOGIN') + availableScreens[j]);
		cy.wait(1234);

		cy.get('tbody > tr:last-child .fa-trash-o:last-child').first().click();
		const nameToBeDeleted = Cypress.$('tbody > tr:last-child .fa-trash-o').first().text();
			
		cy.get('.bootbox-body').should('contain', 'Bạn chắc chắn muốn xóa "');
		cy.get('.bootbox-body').should('contain', nameToBeDeleted);
	}
}


// describe('Confirm before delete', function() {

// 	it('Confirm before delete', function() {
// 		cy.get('tbody > tr:first-child .fa-trash-o').click()
// 		const nameToBeDeleted = Cypress.$('tbody > tr:first-child .fa-trash-o').text()
// 		cy.get('.bootbox-body').should('contain', 'Bạn chắc chắn muốn xóa "')
// 		cy.get('.bootbox-body').should('contain', nameToBeDeleted)
// 	})
// })