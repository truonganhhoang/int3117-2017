describe('CommonTC_GUI', function(){
  it('Dang nhap', function(){
    
      cy.visit('http://13.76.80.144/signin')
        .get('input[name=email]').type('admin_10@gmail.com')
        .get('input[name=password]').type('Methadone@2017{enter}')
        .get('button[type=submit]').click()
    
  })
  it('G_88_Kiểm tra mã hoá mật khẩu', function () {
       cy.get('li.nav-item > a[ui-sref="main.administrators"]').click().wait(1000)
       cy.get('.btn').click()
       cy.get('input.ng-valid-minlength').type('ajbsfhjamk').should('not.contain','**********')
})
})
