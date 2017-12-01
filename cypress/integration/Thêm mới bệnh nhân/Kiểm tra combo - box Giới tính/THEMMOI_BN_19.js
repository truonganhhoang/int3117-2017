describe('Kiểm tra gía trị mặc định của checkbox', function() {
    // Đăng nhập và chuyển tới trang thêm bệnh nhân
    beforeEach(function(){
        cy.visit('signin')
    })
    it("Đăng nhập bằn tài khoản admin", function(){
        cy.get('input[name=email]').type(Cypress.env('USER_AGENCY'));
        cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'));
        cy.get('button[type=submit]').click()
        cy.url().should('include','main/dashboard1')

        //click quan ly benh nhan
        cy.contains('Quản lý bệnh nhân').click()
        cy.wait(1000)

        //click button them
        cy.get('.inputs a').should('have.attr', 'href', '/main/patients/new').click();
        cy.get('[ng-model="patient.gender"]').should('contain', '-- Vui lòng chọn --');
    })
})
