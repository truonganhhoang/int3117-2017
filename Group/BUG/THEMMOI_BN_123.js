describe('Kiểm tra combobox "Loại giấy tờ"', function() {
    beforeEach(function() {
        cy.visit(Cypress.env("routes.signin"));
        cy.get('[name="email"]').type(Cypress.env("accounts.admin_agency.email"));
        cy.get('[name="password"]').type(Cypress.env("accounts.admin_agency.password"));
        cy.get('[type="submit"]').click();
        cy.wait(Cypress.env("delays.after_signin"));

        cy.visit(Cypress.env("routes.main.patients.new"));
        cy.wait(Cypress.env("delays.after_visit"));
    });

    it('Kiểm tra căn lề', function() {
        cy.get('[ng-submit="form.$valid && createPatient()"] [name="identification_type"]').click();
        cy.get('li[role="option"] > div > span').should('have.css', 'text-align', 'left');
    });
});