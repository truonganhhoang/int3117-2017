var uuid = require('uuid');

describe('Kiểm tra chức năng trim space', function() {
    beforeEach(function() {
        cy.visit(Cypress.env("routes.signin"));
        cy.get('[name="email"]').type(Cypress.env("accounts.admin.email"));
        cy.get('[name="password"]').type(Cypress.env("accounts.admin.password"));
        cy.get('[type="submit"]').click();
        cy.wait(Cypress.env("delays.after_signin"));
    });

    var randInt = Date.now() % 10000000;
    var space = ' ';
    var randIntNotTrim = space + randInt + space;
    var randStr = uuid.v4();

    it('financials', function () {
        cy.visit(Cypress.env("routes.main.financials"));
        cy.wait(Cypress.env("delays.after_visit"));

        cy.get('[ng-click="showCreateFinancialModal()"]').click();

        // test fromfinancial
        cy.get('[name="fromfinancial"]').type(randIntNotTrim);
        cy.get('[name="tofinancial"]').type(randInt);
        cy.get('[type="submit"]').click();
        cy.get('[ng-messages="createForm.fromfinancial.$error"] > [ng-message="required"]').should('contain', 'Trường này không được để trống');
        cy.focused().should('have.attr', 'name', 'fromfinancial');

        // test tofinancial
        cy.get('[name="fromfinancial"]').type(randInt);
        cy.get('[name="tofinancial"]').type(randIntNotTrim);
        cy.get('[type="submit"]').click();
        cy.get('[ng-messages="createForm.tofinancial.$error"] > [ng-message="required"]').should('contain', 'Trường này không được để trống');
        cy.focused().should('have.attr', 'name', 'tofinancial');
    });

    it('medicine_list', function () {
        cy.visit(Cypress.env("routes.main.medicine_list"));
        cy.wait(Cypress.env("delays.after_visit"));

        cy.get('[ng-click="showCreateMedicineModal()"]').click();

        // test concentration
        cy.get('[name="name"]').type(randStr);
        cy.get('[name="composition"]').type(randStr);
        cy.get('[name="concentration"]').type(randIntNotTrim);
        cy.get('[name="packing"]').type(randInt);
        cy.get('[name="unit"]').type(randStr);
        cy.get('[name="medicine_type_id"]').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();
        cy.get('[type="submit"]').click();
        cy.get('[ng-messages="form.concentration.$error"] > [ng-message="required"]').should('contain', 'Trường này không được để trống');
        cy.focused().should('have.attr', 'name', 'concentration');

        // test packing
        cy.get('[name="concentration"]').type(randInt);
        cy.get('[name="packing"]').type(randIntNotTrim);
        cy.get('[type="submit"]').click();
        cy.get('[ng-messages="form.packing.$error"] > [ng-message="required"]').should('contain', 'Trường này không được để trống');
        cy.focused().should('have.attr', 'name', 'packing');
    });
});