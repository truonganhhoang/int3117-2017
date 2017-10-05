describe('Kiểm tra combo-box "Tỉnh/Thành phố tạm trú"', function () {
    describe('Tài khoản quản trị hệ thống', function () {
        it('Đăng nhập...', function () {
            cy.visit('/signin');
            cy.get('input[name=email]').type('doctor_10@gmail.com');
            cy.get('input[name=password]').type('Methadone@2017');
            cy.get('button[type=submit]').click();      
        });
    });

    describe('Kiểm tra căn lề trái', function () {
    it('Thêm bệnh nhân...', function () {
                cy.get('li.nav-item > a[ui-sref="main.patients"]').click().wait(1000);
                cy.get('a.btn[href="/main/patients/new"]').click().wait(1000);
                cy.contains('div.portlet', 'Thông tin chi tiết').should('visible');
    });
    it('Test', function() {
        var ele = cy.get("label").contains("Tỉnh/Thành phố tạm trú").next();
        ele.click();

        cy.get('li[role="option"] > div > span').should('have.css', 'text-align', 'left');
        });
    });
});