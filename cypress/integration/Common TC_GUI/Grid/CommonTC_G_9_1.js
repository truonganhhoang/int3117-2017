const _ = require('lodash');

describe("CommonTC_G_9: Kiem tra grid", function () {
    context("1. Kiem tra can le", function () {
        _.forEach(Cypress.env('users'), function (user) {
            context("User: " + user.role, function () {
                _.forEach(user.urls, function (url) {
                    it("Kiem tra grid trong " + url, function () {
                        cy.visit(Cypress.env('LOGIN_URL'));
                        cy.get('input[name=email]').type(user.user.email);
                        cy.get('input[name=password]').type(user.user.password);
                        cy.get('button[type=submit]').click();
                        cy.wait(1000);
                        cy.visit(url);
                        cy.wait(1000);
                        //TODO: Kiem tra grid trong bang du lieu: number can phai, text can trai, ngay thang can giua
                        cy.get('table tr td').each(function ($el, index, $list) {
                            // console.log($el.text(), isNaN(parseInt($el.text())));
                            if (!isNaN(parseInt($el.text()))) {
                                expect($el).to.have.css('text-align', 'right');
                            }
                            else {
                                if (isNaN($el.text())) {
                                    var date = new Date($el.text());
                                    if (date instanceof Date && !isNaN(date.valueOf())) {
                                        expect($el).to.have.css('text-align', 'center');
                                    } else {
                                        expect($el).to.have.css('text-align', 'left');
                                    }
                                }
                            }
                        });

                        //TODO: Kiem tra HeaderName co can giua va boi dam hay khong
                        // cy.get('.page-header .title').each(function ($el, index, $list) {
                        //     expect($el).to.have.css('text-align', 'left');
                        //     expect($el).to.have.css('font-weight', 'bold');
                        // });

                    });
                })
            });
        });
    });
});