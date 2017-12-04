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

    it('Kiểm tra ngày sinh không đựoc lớn hơn ngày hiện tại', function () {
        var today = new Date();
        var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        var tomorrowStr = [tomorrow.getDate(), tomorrow.getMonth() + 1, tomorrow.getFullYear()].join("/");
        cy.get('[name="birth_date"]').type(tomorrowStr);
        cy.get('[ng-submit="form.$valid && createPatient()"] [type="submit"]').click();
        cy.get('[ng-messages="form.birth_date.$error"] > [ng-message="dateLess"]').should('contain', 'Ngày sinh không được lớn hơn ngày hiện tại');
    });
});