var RANDOM_NUMBER = Math.floor(Math.random() * 20) + 10

describe('Kiểm tra  Textbox "Địa chỉ"', function () {
    describe('Tài khoản quản trị hệ thống', function () {
        it('Đăng nhập...', function () {
            cy.visit(Cypress.env('URL_LOGIN'));
            cy.get('input[name=email]').type(Cypress.env('USER_DOCTOR'));
            cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'));
            cy.get('button[type=submit]').click().should('not.exist');      
        });
        it('Thêm bệnh nhân...', function () {
                cy.get('li.nav-item > a[ui-sref="main.patients"]').click().wait(1000);
                cy.get('a.btn[href="/main/patients/new"]').click().wait(1000);
                cy.contains('div.portlet', 'Thông tin chi tiết').should('visible');
        });
    });
describe('Test',function() {
    it('Kiểm tra TV', function () {
        
        var prefix = '[ng-submit="form.$valid && createPatient()"]'
        cy.get(prefix + ' [name="name"]').eq(0).type('Tran Khac Tran');

        cy.get(prefix + ' [name="birth_date"]').type('01/01/2012').type('{esc}');

        cy.get(prefix + ' [name="gender"]').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();

        cy.get(prefix + ' [name="admission_date"]').type('01/08/2017').type('{esc}');

        cy.get(prefix + ' [name="ward_id"]').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();

        cy.get(prefix + ' [ng-click="copyHousehold()"]').click();

        cy.get(prefix + ' [name="identification_number"]').type('945793745457');

        cy.get(prefix + ' [name="identification_type"]').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();

        cy.get(prefix + ' [name="identification_issued_date"]').type('01/09/2017').type('{esc}');

        cy.get(prefix + ' [name="identification_issued_by"]').type('HL');

        cy.get(prefix + ' [name="name"]').eq(1).type('Bố');

        cy.get(prefix + ' [name="contact_type"]').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();

        cy.get('input.form-control[ng-model="contact.address"]').type('Phúc Thọ - Hà Nội').type('{esc}');

        cy.get(prefix + ' [type="submit"]').click().get('div[ng-switch]')
            .find('.toast-message')
            .should('contain', "Tạo mới thành công");
    });

   });
});