var delay = 3000;
describe('Kiem tra gia tri mac dinh', function () {
    describe('Use account agency', function () {
        it('Login ...', function () {
            cy.visit(Cypress.env("URL_LOGIN"))
                .get('input[name=email]').type(Cypress.env("USER_AGENCY"))
                .get('input[name=password]').type(Cypress.env("LOGIN_PASSWORD")).type('{enter}')
                .wait(delay)
                .visit(Cypress.env("URL_ADD_NEW_PATIENT"))
                .wait(delay)
        })

        it('Check default value', function () {
            cy
                .get('.form-group')
                .find("input[ng-model='patient.resident_hamlet']")
                .should("contain", '')
                .url().should('include', Cypress.env("URL_ADD_NEW_PATIENT"))
        })
    })
})