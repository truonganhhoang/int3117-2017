describe('CommonTC_G_90', function(){
  it('Dang nhap bang tai khoan admin', function(){
    cy.fixture('users').then((user) =>{
      cy.visit('/signin');
      cy.get('input[name=email]').type(user.admin.email);
      cy.get('input[name=password]').type(user.admin.password);
      cy.get('button[type=submit]').click();
      cy.wait(delay);
    })
  })

  it('Quan ly nguoi dung', function () {
    cy.get('li.nav-item > a[ui-sref="main.administrators"]').click().wait(1000)
    })
  
  it('Kiểm tra nhập các trường số', function () {  
    cy.get('.btn').click().wait(1000)
    cy.get('input.ng-valid-email').type('fsdfacdsasawr@gmail.com')
    cy.get('input.ng-valid-minlength').type('13546798945')
    cy.get('div.form-group:nth-child(3) > input:nth-child(2)').type('Marki')
    cy.get('div.form-group:nth-child(4) > input:nth-child(2)').type('Hov')
  })
})