const _ = require('lodash');

describe("CommonTC_G_9: Kiem tra grid", function () {
    context("3.3. Kiem tra bo cuc trong grid", function () {
        _.forEach(Cypress.env('users'), function (user) {
            context("User: " + user.role, function () {
                _.forEach(user.urls, function (url) {
                    it("Cac chuc nang nam o cot cuoi cung ben phai", function () {
                        cy.visit(Cypress.env('LOGIN_URL'));
                        cy.get('input[name=email]').type(user.user.email);
                        cy.get('input[name=password]').type(user.user.password);
                        cy.get('button[type=submit]').click();
                        cy.wait(1000);
                        cy.visit(url);
                        cy.wait(1000);
                        cy.get('tbody tr:first td:last').each(function ($el, index, $list) {
                            var event = ($el.find('a').attr('ng-click'));
                            expect(event).to.not.be.undefined;
                        });
                    });
                });
            });
        });
    });
});