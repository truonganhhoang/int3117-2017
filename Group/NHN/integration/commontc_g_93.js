describe('Check default value of radio button', function() {

	it('Radio for Admin', function() {
		checkRadio(0);
	})

	it('Radio for Agency admin', function() {
		checkRadio(1);
	})

	it('Radio for Doctor', function() {
		checkRadio(2);
	})

	it('Radio for Nurse', function() {
		checkRadio(3)
	})

	it('Radio for Storekeeper', function() {
		checkRadio(4)
	})

	it('Radio in common test', function() {
		cy.visit(Cypress.env('URL_LOGIN'));
		cy.get('input[name=email]').type('admin_10@gmail.com');
		cy.get('input[name=password]').type('Methadone@2017{enter}');

		cy.wait(1234);
		cy.visit(Cypress.env('URL_COMMON_TEST'));

		cy.get('input[type=radio]:first').filter('.ng-empty');
		cy.get('input[type=radio]:last').filter('.ng-empty');
	})

})

function checkRadio(screenIndex) {
	cy.clearCookies();
	cy.visit(Cypress.env('URL_LOGIN'));

	cy.get('input[name=email]').type(Cypress.env('list_screen')[screenIndex].email);
	cy.get('input[name=password]').type('Methadone@2017{enter}');

	cy.wait(1234);

	var availableScreens = Cypress.env('list_screen')[screenIndex].availableScreens;
	for (var j = 0; j < availableScreens.length; ++j) {
		cy.visit(Cypress.env('URL_LOGIN') + availableScreens[j]);
		cy.wait(1234);

		
		if (Cypress.$('input[type=radio]').length != 0) {
			cy.get('input[type=radio]:first').filter('.ng-empty');
			cy.get('input[type=radio]:last').filter('.ng-empty');
		}
		
	}
}