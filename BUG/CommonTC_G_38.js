var uuid = require('uuid');

describe('Nhập dữ liệu là số có chữ số 0 đầu tiên', function() {
    beforeEach(function() {
        cy.visit(Cypress.env("routes.signin"));
        cy.get('[name="email"]').type(Cypress.env("accounts.admin.email"));
        cy.get('[name="password"]').type(Cypress.env("accounts.admin.password"));
        cy.get('[type="submit"]').click();
        cy.wait(Cypress.env("delays.after_sigin"));
    });

    var randInt = Date.now() % 100000000;
    var zero = '0';
    var randIntNotTrim = zero + randInt;
    var randStr = uuid.v4();

    it('financials', function () {
        cy.visit(Cypress.env("routes.main.financials"));
        cy.wait(Cypress.env("delays.after_visit"));

        // add
        cy.get('[ng-click="showCreateFinancialModal()"]').click();
        cy.get('[name="fromfinancial"]').type(randIntNotTrim);
        cy.get('[name="tofinancial"]').type(randIntNotTrim);
        cy.get('[type="submit"]').click();
        cy.wait(Cypress.env("delays.after_create"));

        // test
        cy.get('[ng-model="keyword"]').type(randInt).type('{enter}');
        cy.get('#currency-no-fractions').should('not.contain', 'Từ ' + zero).and('not.contain', 'đến ' + zero);
    });

    it('medicine_list', function () {
        cy.visit(Cypress.env("routes.main.medicine_list"));
        cy.wait(Cypress.env("delays.after_visit"));

        // add
        cy.get('[ng-click="showCreateMedicineModal()"]').click();
        cy.get('[name="name"]').type(randStr);
        cy.get('[name="composition"]').type(randStr);
        cy.get('[name="concentration"]').type(zero + '1111');
        cy.get('[name="packing"]').type(zero + '1111');
        cy.get('[name="unit"]').type(randStr);
        cy.get('[name="medicine_type_id"]').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();
        cy.get('[type="submit"]').click();
        cy.wait(Cypress.env("delays.after_create"));

        // test
        cy.get('[ng-model="keyword"]').type(randStr).type('{enter}');
        cy.wait(Cypress.env("delays.after_search"));
        cy.get('tbody > tr:first-child > td:nth-child(4)').should('not.contain', zero);
        cy.get('tbody > tr:first-child > td:nth-child(5)').should('not.contain', zero);
    });
});