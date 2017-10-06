var uuid = require('uuid');

describe('Kiểm tra chức năng Trim space', function() {
    beforeEach(function() {
        cy.visit(Cypress.env("routes.signin"));
        cy.get('[name="email"]').type(Cypress.env("accounts.admin.email"));
        cy.get('[name="password"]').type(Cypress.env("accounts.admin.password"));
        cy.get('[type="submit"]').click();
        cy.wait(Cypress.env("delays.after_signin"));
    });

    var randInt = Date.now();
    var randStr = uuid.v4();
    var space = ' ';
    var randStrNotTrim = space + randStr + space;

    it('administrators', function () {
        cy.visit(Cypress.env("routes.main.administrators"));
        cy.wait(Cypress.env("delays.after_visit"));

        // add
        var email = 'test_' + randInt + '@gmail.com';
        var emailNotTrim = space + email + space;
        cy.get('[ng-click="showCreateAdminModal()"]').click();
        cy.get('[name="email"]').type(emailNotTrim);
        cy.get('[name="password"]').type('Methadone@2017');
        cy.get('[name="first_name"]').type(randStrNotTrim);
        cy.get('[name="last_name"]').type(randStrNotTrim);
        cy.get('[name="issuing_agency_id"]').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();
        cy.get('[type="submit"]').click();
        cy.wait(Cypress.env("delays.after_create"));

        // test
        cy.get('[ng-model="keyword"]').type(email).type('{enter}');
        cy.wait(Cypress.env("delays.after_search"));
        cy.get('tbody > tr:first-child > td:nth-child(2)').should('not.contain', randStrNotTrim);
        cy.get('tbody > tr:first-child > td:nth-child(3) > a').should('not.contain', emailNotTrim);
    });

    it('issuing_agency', function() {
        cy.visit(Cypress.env("routes.main.issuing_agency"));
        cy.wait(Cypress.env("delays.after_visit"));

        // add
        cy.get('[ng-click="showCreateIssuingAgencyModal()"]').click();
        cy.get('[name="name"]').type(randStrNotTrim);
        cy.get('[name="address"]').type(randStrNotTrim);
        cy.get('[name="province_id"]').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();
        cy.get('[name="district_id"]').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();
        cy.get('[name="ward_id"]').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();
        cy.get('[type="submit"]').click();
        cy.wait(Cypress.env("delays.after_create"));

        // test
        cy.get('tbody > tr:first-child > td:nth-child(3)').should('not.contain', space);
        cy.get('tbody > tr:first-child > td:nth-child(7)').should('not.contain', space);
    });

    it('medicine_list', function() {
        cy.visit(Cypress.env("routes.main.medicine_list"));
        cy.wait(Cypress.env("delays.after_visit"));

        // add
        cy.get('[ng-click="showCreateMedicineModal()"]').click();
        cy.get('[name="name"]').type(randStrNotTrim);
        cy.get('[name="composition"]').type(randStrNotTrim);
        cy.get('[name="concentration"]').type(10);
        cy.get('[name="packing"]').type(1000);
        cy.get('[name="unit"]').type(randStrNotTrim);
        cy.get('[name="medicine_type_id"]').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();
        cy.get('[type="submit"]').click();
        cy.wait(Cypress.env("delays.after_create"));

        // test
        cy.get('[ng-model="keyword"]').type(randStr).type('{enter}');
        cy.wait(Cypress.env("delays.after_search"));
        cy.get('tbody > tr:first-child > td:nth-child(2)').should('not.contain', space);
        cy.get('tbody > tr:first-child > td:nth-child(3)').should('not.contain', space);
        cy.get('tbody > tr:first-child > td:nth-child(6)').should('not.contain', space);
    });

    var routes = [
        "employments",
        "maritals",
        "educations",
        "stop_reasons",
        "manufacturers",
        "providers",
        "sources"
    ];
    routes.forEach(function(route) {
        it(route, function() {
            cy.visit(Cypress.env("routes.main." + route));
            cy.wait(Cypress.env("delays.after_visit"));

            // add
            cy.get('.portlet-title > .inputs > .ng-binding').click();
            cy.get('[name="name"]').type(randStrNotTrim);
            cy.get('[type="submit"]').click();
            cy.wait(Cypress.env("delays.after_create"));

            // test
            cy.get('[ng-model="keyword"]').type(randStr).type('{enter}');
            cy.wait(Cypress.env("delays.after_search"));
            cy.get('tbody > tr:first-child > td:nth-child(2)').should('not.contain', space);
        });
    });
});