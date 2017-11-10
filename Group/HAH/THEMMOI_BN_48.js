describe('Kiểm tra combo-box "Tình hình tài chính"', function () {
    describe('Tài khoản quản trị hệ thống', function () {
        it('Đăng nhập...', function () {
            cy.visit(Cypress.env('URL_LOGIN'));
            cy.get('input[name=email]').type(Cypress.env('USER_DOCTOR'));
            cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'));
            cy.get('button[type=submit]').click().should('not.exist');      
        });
    });

    describe('Kiểm tra căn lề trái', function () {
    it('Thêm bệnh nhân...', function () {
                cy.get('li.nav-item > a[ui-sref="main.patients"]').click().wait(1000);
                cy.get('a.btn[href="/main/patients/new"]').click().wait(1000);
                cy.contains('div.portlet', 'Thông tin chi tiết').should('visible');
    });
    it('Test', function() {
        var ele = cy.get("label").contains("Tình hình tài chính").next();
        ele.click();

        cy.get('li[role="option"] > div > span').should('have.css', 'text-align', 'left');
        });
    });
});
