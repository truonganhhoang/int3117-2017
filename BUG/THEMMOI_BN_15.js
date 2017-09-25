describe('Kiểm tra trường "ngày sinh"', function() {
    beforeEach(function () {
        cy.visit(Cypress.env("routes.signin"));
        cy.get('[name="email"]').type(Cypress.env("accounts.admin_agency.email"));
        cy.get('[name="password"]').type(Cypress.env("accounts.admin_agency.password"));
        cy.get('[type="submit"]').click();
        cy.wait(Cypress.env("delays.after_signin"));

        cy.visit(Cypress.env("routes.main.patients.new"));
        cy.wait(Cypress.env("delays.after_visit"));
    });

    it('Kiểm tra hoạt động của hộp Calendar', function () {
        cy.get('[name="birth_date"] + .input-group-btn > .btn').click();
        cy.get('.today.day').click();
        cy.get('.datepicker-dropdown').should('not.be.visible');
        cy.get('[name="birth_date"]').then(function($input) {
            var value = $input.val();
            expect(value).to.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/);
        });
    });
});