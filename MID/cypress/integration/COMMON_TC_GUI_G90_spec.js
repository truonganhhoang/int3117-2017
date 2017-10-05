describe('CommonTC_GUI', function(){
  describe('Dang nhap', function(){
    it('Dang nhap bang tai khoan admin', function(){
      cy.visit('http://13.76.80.144/signin')
        .get('input[name=email]').type('admin_10@gmail.com')
        .get('input[name=password]').type('Methadone@2017')
        .get('button[type=submit]').click()
    })
  })
  describe('Quan ly nguoi dung', function () {
        it('Chuyen trang...', function () {
          cy.get('li.nav-item > a[ui-sref="main.administrators"]').click().wait(1000)
        })
  
          describe('G_90_Kiểm tra nhập các trường số', function () {  
        // Tại trường Mật khẩu thực hiện nhập thông tin là kiểu  số
        // Cho phép nhập

            it('click Them', function () {
             cy.get('.btn').click()
            })
            it('Nhap Email', function () {
             cy.get('input.ng-valid-email').type('admin_20@gmail.com')
            })
            it('Nhap Mat khau', function () {
             cy.get('input.ng-valid-minlength').type('13546798945')
            })
            it('Nhap Ho', function () {
             cy.get('div.form-group:nth-child(3) > input:nth-child(2)').type('Marki')
            })
            it('Nhap Ten', function () {
             cy.get('div.form-group:nth-child(4) > input:nth-child(2)').type('Hov')
            })
            it('Nhap Qu ', function(){
             cy.get('.select2-arrow > b:nth-child(1)').click()
              cy.get('.ui-select-choices-row-inner').contains('CSĐT MMT Ba Vì').click()
            })
            it('Click Luu', function () {
             cy.get('button.btn.blue-custom.btn-sm.ng-binding').click()
             // cy.get('.ng-active > div:nth-child(1)').should(($loi) => {
             //    expect($loi).to.contain('Mật khẩu cần có chữ cái, chữ số, các ký tự đặc biệt')
             // cy.get('body').should()
              })
            })
          })
       })

