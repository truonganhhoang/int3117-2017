describe('Kiểm tra số lượng và sắp xếp các gía trị trong combo', function() {
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

        var gender = ["Nam", "Nữ", "Khác"]
        cy.get('[ng-model="patient.gender"]').within(function(){
          cy.contains('-- Vui lòng chọn --').click()
          cy.get('ul>li').each(function($li, index, $lis){
            var ids = "ui-select-choices-row-26-" + index
            var lis = 'li#' + ids
            cy.get(lis).should('contain', gender[index])
          })
        })
    })
})
