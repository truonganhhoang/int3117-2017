describe(' Kiểm tra giá trị mặc định của Textbox khi tìm kiếm', function() {
  context('CommonTC_G_20', function(){
    beforeEach(function(){
      cy
        .visit(Cypress.env('URL_LOGIN'))
        .get("input[name='email']").clear().type(Cypress.env('USER_ADMIN'))
        .get("input[name='password']").type(Cypress.env('LOGIN_PASSWORD')).type("{enter}")
        .wait(3000)
        .visit(Cypress.env('URL_ADMIN'))
        .wait(3000)
      })
    it('Giá trị mặc định là trống', function(){
      cy.get('input').should('not.have.value', 'US')
    }) 
  })
})
