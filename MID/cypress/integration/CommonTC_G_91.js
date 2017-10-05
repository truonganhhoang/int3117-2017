describe('CommonTC_GUI', function(){
  it('Dang nhap', function(){
    
      cy.visit('/signin')
        .get('input[name=email]').type('admin_10@gmail.com')
        .get('input[name=password]').type('Methadone@2017{enter}')
        .get('button[type=submit]').click()
    
  })
  it('G_91_Kiểm tra nhập các ký tự đặc biệt', function () {
       cy.get('li.nav-item > a[ui-sref="main.administrators"]').click().wait(1000)
       cy.get('.btn').click()
       cy.get('input.ng-valid-email').type('admin_20@gmail.com')
       cy.get('input.ng-valid-minlength').type('@#$%^&@#$%^&^%')
       cy.get('div.form-group:nth-child(3) > input:nth-child(2)').type('Marki')
       cy.get('div.form-group:nth-child(4) > input:nth-child(2)').type('Hov')
       cy.get('.select2-arrow > b:nth-child(1)').click()
       cy.get('.ui-select-choices-row-inner').contains('CSĐT MMT Ba Vì').click()
       cy.get('button.btn.blue-custom.btn-sm.ng-binding').click()
       cy.get('div.form-group:nth-child(2) > div:nth-child(3) > div:nth-child(1)').should('contain','Mật khẩu cần có chữ cái, chữ số, các ký tự đặc biệt')
  })
})
