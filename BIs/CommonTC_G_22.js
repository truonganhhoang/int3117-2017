describe('Kiểm tra tìm kiếm các ký tự đặc biệt', function() {
  context('CommonTC_G_22', function(){
    beforeEach(function(){
      cy
        .visit(Cypress.env('URL_LOGIN'))
        .get("input[name='email']").clear().type(Cypress.env('USER_ADMIN'))
        .get("input[name='password']").type(Cypress.env('LOGIN_PASSWORD')).type("{enter}")
        .wait(3000)
        .visit(Cypress.env('URL_ADMIN'))
      })
      it('Thêm tài khoản trưởng cơ sở', function(){
        cy
          .get("a").contains("Thêm").click()
          .get("input[name= 'email']").type('trung_anh_97@gmail.com')
          .get("input[name= 'password']").type('trunganh1997**')
          .get("input[name= 'first_name']").type('Nguyễn')
          .get("input[name= 'last_name']").type('Trung && Anh')
          .get("label").contains("Quản lý cơ sở").parent().within(function () {
            cy.get("a").click()
        })
        cy.get('li').contains('CSĐT MMT Ba Vì').click()
          .get('button').contains('Lưu').click()
          .wait(3000)
          .get('div[ng-switch]')
          .find('.toast-message')
          .should('contain', "Tạo mới người dùng thành công")
          .url().should('include', Cypress.env("URL_ADMIN"))
      }) 
    })
  }) 