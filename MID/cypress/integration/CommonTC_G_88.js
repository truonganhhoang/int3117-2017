describe('CommonTC_G_88', function(){
  it('Dang nhap', function(){
      cy.visit('/signin')
        .get('input[name=email]').type(user.admin.email)
        .get('input[name=password]').type(user.admin.password)
        .get('button[type=submit]').click()
    
  })
  it('G_88_Kiểm tra mã hoá mật khẩu', function () {
       cy.get('li.nav-item > a[ui-sref="main.administrators"]').click().wait(1000)
       cy.get('.btn').click()
       cy.get('input.ng-valid-minlength').should('have.attr','type','password')
})
})
