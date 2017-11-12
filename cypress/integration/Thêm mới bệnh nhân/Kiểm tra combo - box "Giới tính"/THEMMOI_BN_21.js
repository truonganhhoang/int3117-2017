describe('Kiểm tra căn lề', function() {
    // Đăng nhập và chuyển tới trang thêm bệnh nhân
    beforeEach(function(){

        cy.visit('signin')
    })
    it("Đăng nhập bằn tài khoản admin", function(){
        cy.get('input[name=email]').type(Cypress.env('USER_AGENCY'));
        cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'));
        cy.get('button[type=submit]').click()
        cy.url().should('include','main/dashboard1')

        cy.contains('Quản lý bệnh nhân').click()
        //click button them
        cy.get('.inputs a').should('have.attr', 'href', '/main/patients/new').click();
        cy.wait(1000)
        cy.get('.ui-select-container.select2.select2-container.ng-empty.ng-invalid.ng-invalid-required').first().click()
        cy.get('.select2-result-label.ui-select-choices-row-inner span').and('have.css', 'text-align')
        .and('match', /left/)
    })
})
