describe('Kiểm tra trường "ngày sinh"', function () {
    beforeEach(function () {
        cy.visit(Cypress.env("routes.signin"));
        cy.get('[name="email"]').type(Cypress.env("accounts.admin_agency.email"));
        cy.get('[name="password"]').type(Cypress.env("accounts.admin_agency.password"));
        cy.get('[type="submit"]').click();
        cy.wait(Cypress.env("delays.after_signin"));

        cy.visit(Cypress.env("routes.main.patients.new"));
        cy.wait(Cypress.env("delays.after_visit"));
    });

    it('Kiểm tra thao tác nhập ngày', function () {
        cy.get('[name="birth_date"]').type('123456').type('{esc}');
        cy.get('[ng-messages="form.birth_date.$error"] > [ng-message="pattern"]').should('contain', 'Ngày tháng phải theo đúng định dạng dd/mm/yyyy');
    });
});