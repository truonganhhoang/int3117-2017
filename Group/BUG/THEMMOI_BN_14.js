describe('Kiểm tra trường "ngày sinh"', function() {
    beforeEach(function() {
        cy.visit(Cypress.env("routes.signin"));
        cy.get('[name="email"]').type(Cypress.env("accounts.admin_agency.email"));
        cy.get('[name="password"]').type(Cypress.env("accounts.admin_agency.password"));
        cy.get('[type="submit"]').click();
        cy.wait(Cypress.env("delays.after_signin"));

        cy.visit(Cypress.env("routes.main.patients.new"));
        cy.wait(Cypress.env("delays.after_visit"));
    });

    it('Kiểm tra focus trong hộp calendar khi textbox đã có dữ liệu', function(){
        cy.get('[name="birth_date"]').type('20/10/2005');
        cy.get('.active.day').should('contain', '20');
        cy.get('.datepicker-days .datepicker-switch').should('contain', 'October 2005');
    });
});
