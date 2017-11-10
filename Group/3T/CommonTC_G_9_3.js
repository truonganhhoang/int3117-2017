const _ = require('lodash');

describe("CommonTC_G_9: Kiem tra grid", function () {
    context("3.3. Kiem tra bo cuc trong grid", function () {
        _.forEach(Cypress.env('users'), function (user) {
            context("User: " + user.role, function () {
                _.forEach(user.urls, function (url) {
                    it("Cac chuc nang phan trang nam o goc duoi cung ben trai grid", function () {
                        cy.visit(Cypress.env('LOGIN_URL'));
                        cy.get('input[name=email]').type(user.user.email);
                        cy.get('input[name=password]').type(user.user.password);
                        cy.get('button[type=submit]').click();
                        cy.wait(1000);
                        cy.visit(url);
                        cy.wait(1000);
                        cy.get('table').each(function ($el, index, $list) {
                            // console.log('offset top', $el.offset().top);
                            var tableOffsetTop = $el.offset().top;
                            var tableOffsetLeft = $el.offset().left;
                            var tableWidth = $el.width();
                            cy.get('.pagination').each(function ($el, index, $list) {
                                var paginationOffsetTop = $el.offset().top;
                                var paginationOffsetLeft = $el.offset().left;
                                // console.log('offset top', $el.offset().top);
                                console.log(paginationOffsetLeft, tableOffsetLeft + tableWidth/4);
                                expect(paginationOffsetTop - tableOffsetTop > 0).to.be.true;
                                expect(paginationOffsetLeft - (tableOffsetLeft + tableWidth/4) < 0).to.be.true;
                            });
                        });
                    });
                });
            });
        });
    });
});