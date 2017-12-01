describe('Kiểm tra combobox "Loại giấy tờ"', function () {
    beforeEach(function () {
        cy.visit(Cypress.env("routes.signin"));
        cy.get('[name="email"]').type(Cypress.env("accounts.admin_agency.email"));
        cy.get('[name="password"]').type(Cypress.env("accounts.admin_agency.password"));
        cy.get('[type="submit"]').click();
        cy.wait(Cypress.env("delays.after_signin"));

        cy.visit(Cypress.env("routes.main.patients.new"));
        cy.wait(Cypress.env("delays.after_visit"));
    });

    it('Kiểm tra thông tin bắt buộc', function () {
        cy.get('[ng-submit="form.$valid && createPatient()"] [name="name"]').eq(0).type('An');

        cy.get('[name="birth_date"]').type('12/12/2012').type('{esc}');

        cy.get('[ng-submit="form.$valid && createPatient()"] [name="gender"]').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();

        cy.get('[ng-submit="form.$valid && createPatient()"] [name="admission_date"]').type('23/04/2017').type('{esc}');

        cy.get('[ng-submit="form.$valid && createPatient()"] [name="ward_id"]').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();

        cy.get('[ng-submit="form.$valid && createPatient()"] [ng-click="copyHousehold()"]').click();

        var uuid = require('uuid');
        cy.get('[ng-submit="form.$valid && createPatient()"] [name="identification_number"]').type(uuid.v4());

        cy.get('[ng-submit="form.$valid && createPatient()"] [name="identification_issued_date"]').type('22/04/2017').type('{esc}');

        cy.get('[ng-submit="form.$valid && createPatient()"] [name="identification_issued_by"]').type('HN');

        cy.get('[ng-submit="form.$valid && createPatient()"] [name="name"]').eq(1).type('Anh');

        cy.get('[ng-submit="form.$valid && createPatient()"] [name="contact_type"]').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();

        cy.get('[ng-submit="form.$valid && createPatient()"] [type="submit"]').click();

        cy.get('[ng-submit="form.$valid && createPatient()"] [ng-messages="form.identification_type.$error"] > [ng-message="required"]').should('contain', 'Trường này không được để trống');
    });
});