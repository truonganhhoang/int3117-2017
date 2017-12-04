const _ = require('lodash');

describe("Kiểm tra khi trường Từ ngày bằng trường Đến ngày", function () {

    // Login vào lần lượt từng User
    _.forEach(Cypress.env('users'), function (user) {
        context("User: " + user.role, function () {
            _.forEach(user.urls, function (url) {
                cy.visit(Cypress.env('LOGIN_URL'));
                cy.get('input[name=email]').type(user.user.email);
                cy.get('input[name=password]').type(user.user.password);
                cy.get('button[type=submit]').click();
                cy.wait(1000);
                cy.visit(url);
                cy.wait(1000);

                // lấy ngày hiện tại cho trường nhập ngày
                var date = new Date();

                it('Đến nội dung', function() {

                    //chọn button Nâng cao
                    cy.contains('Nâng cao').click();
                    cy.wait(500);

                    //Nhập date vào ô input Từ ngày
                    cy.get('input[name=from_date]').clear();
                    cy.get('input[name=from_date]').type(date);

                    //Nhập date vào ô input Đến ngày
                    cy.get('input[name=to_date]').clear();
                    cy.get('input[name=to_date]').type(date);

                    //Click Tạo báo cáo
                    cy.get('button[type=submit]').click();

                    cy.get('div').should('contain', 'Giá trị Từ ngày bằng giá trị Đến ngày!');
                    cy.get('input[name=from_date]').blur();

                })
            })
        });
    });
});