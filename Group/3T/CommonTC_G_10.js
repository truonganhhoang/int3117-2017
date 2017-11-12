const _ = require('lodash');

describe("Common TC G 10: Kiem tra cach danh so cac ban ghi", function () {
    context("Trong grid: Kiem tra so thu tu cac ban ghi", function () {
        _.forEach(Cypress.env('users'), function (user) {
            context("User: " + user.role, function () {
                _.forEach(user.urls, function (url) {
                    it("Danh so thu tu tang dan va lien tuc", function () {
                        cy.visit(Cypress.env('LOGIN_URL'));
                        cy.get('input[name=email]').type(user.user.email);
                        cy.get('input[name=password]').type(user.user.password);
                        cy.get('button[type=submit]').click();
                        cy.wait(1000);
                        cy.visit(url);
                        cy.wait(1000);
                        var result = true;
                        cy.get('tbody tr td:first').each(function ($el, index, $list) {
                            var stt = parseInt($el.text());
                            var continiuos = true;
                            cy.get('tbody tr').each(function ($el, index, $list) {
                                console.log($el.find('td:first').text(), result);
                                if (stt !== parseInt($el.find('td:first').text())) {
                                    result = false;
                                }
                                stt++;
                            }).then($el => {
                                cy.get('.pagination-next a').each(function ($el, index, $list) {
                                    if ($el.attr('disabled') == undefined) {
                                        cy.wrap($el).click();
                                        cy.wait(1000);
                                        cy.get('tbody tr').each(function ($el, index, $list) {
                                            console.log($el.find('td:first').text(), result);
                                            if (stt !== parseInt($el.find('td:first').text())) {
                                                result = false;
                                            }
                                            stt++;
                                        });
                                    } else {
                                        continiuos = false;
                                    }
                                });
                            });
                        });
                        expect(result).to.be.true;
                    })
                });
            });
        });
    });
});
describe("Common TC G 10: Kiem tra cach danh so cac ban ghi", function () {



});
