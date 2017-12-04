describe('Button spelling & alignment', function() {
	
	it('Login button', function() {
		cy.visit(Cypress.env('URL_LOGIN'));

		var label = Cypress.$('.blue-custom').text();
		cy.exec('curl http://vspell.com/Spell/SpellCheck --data htmlString=' + encodeURI(label)).its('stdout').should('contain', '"SuggestionCount":0');

		cy.get('.ng-binding').should('have.css', 'text-align', 'center');

		cy.get('input[name=email]').type('admin_10@gmail.com');
		cy.get('input[name=password]').type('Methadone@2017{enter}');

	})

	it('Buttons for Admin', function() {
		checkScreen(0);
	})

	it('Buttons for Agency admin', function() {
		checkScreen(1);
	})

	it('Buttons for Doctor', function() {
		checkScreen(2);
	})

	it('Buttons for Nurse', function() {
		checkScreen(3)
	})

	it('Buttons for Storekeeper', function() {
		checkScreen(4)
	})

	it('Buttons in common test', function() {
		cy.visit(Cypress.env('URL_LOGIN'));
		cy.get('input[name=email]').type('admin_10@gmail.com');
		cy.get('input[name=password]').type('Methadone@2017{enter}');

		cy.wait(1234);
		cy.visit(Cypress.env('URL_COMMON_TEST'));

		if (Cypress.$('.blue-custom').length != 0) {
			cy.get('.blue-custom').each(function($el, index, $list) {
				var label = ($el).text();
				isCorrectSpelling(label);

				cy.wrap($el).should('have.css', 'text-align', 'center');
			})
		}
	})

})

function checkScreen(screenIndex) {
	cy.clearCookies();
	cy.visit(Cypress.env('URL_LOGIN'));

	cy.get('input[name=email]').type(Cypress.env('list_screen')[screenIndex].email);
	cy.get('input[name=password]').type('Methadone@2017{enter}');

	cy.wait(1234);

	var availableScreens = Cypress.env('list_screen')[screenIndex].availableScreens;
	for (var j = 0; j < availableScreens.length; ++j) {
		cy.visit(Cypress.env('URL_LOGIN') + availableScreens[j]);
		cy.wait(1234);

		if (Cypress.$('.blue-custom').length != 0) {
			cy.get('.blue-custom').each(function($el, index, $list) {
				var label = ($el).text();
				isCorrectSpelling(label);

				cy.wrap($el).should('have.css', 'text-align', 'center');
			})
		}
		
	}
}

function httpGet(theUrl, data)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send('htmlString=' + data);

    return xmlHttp.responseText;
}

function isCorrectSpelling(stringToCheck) {
	cy.exec('curl http://vspell.com/Spell/SpellCheck --data htmlString=' + encodeURI(stringToCheck)).its('stdout').should('contain', '"SuggestionCount":0');
}

