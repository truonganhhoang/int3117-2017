describe('Kiểm tra trường bắt buộc nhập của textbox', function() {
  context('CommonTC_G_21', function(){
    beforeEach(function(){
      cy
        .visit(Cypress.env('URL_LOGIN'))
        .wait(3000)
    })
    it('Giá trị mặc định là trống', function(){
      cy
        .get("input[required][name=email]").should('not.have.value')
        .get("input[required][name=password]").type('LOGIN_PASSWORD').type("{enter}")
        .get('.ng-active').should('contain','Trường này không được để trống')
        .get("input[required][name=email]").focus()
        .wait(3000)
    }) 
  })
}) 