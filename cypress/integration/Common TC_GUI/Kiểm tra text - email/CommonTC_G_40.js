const time = 1000

  describe('Kiem tra truong email la bat buoc nhap', function () {
    describe('Dang nhap', function() {
      it('Dang nhap bang tai khoan admin', function () {
        cy.visit('/signin')
        cy.get('input[name=email]').type('admin_10@gmail.com')
        cy.get('input[name=password]').type('Methadone@2017')
        cy.get('button[type=submit]').click()
      })
    })

    describe('Quan ly nguoi dung', function(){
      it('Vao trang chinh quan ly nguoi dung', function() {
        cy.wait(time)
        cy.visit('/main/admin/administrators')    
      })

      it('Click vao nut "+Them"', function() {
        cy.wait(time)
        cy.get('a.btn.blue-custom.btn-sm.ng-binding').click()
      })
      
      it('Hien thi form tao tai khoan moi co truong email', function() {
        cy.wait(time)
        cy.get('h3.modal-title.text-bold-header.ng-binding').should('contain', 'Tạo tài khoản trưởng cơ sở')
        cy.get('label.required').should(($label) => {
            expect($label).to.contain('Email:')
        })
      })

      it('Khong nhap du lieu vao o email', function() {
        cy.wait(time)
        cy.get('input[name=password]').type('abc123!@#')
        cy.get('input[name=first_name]').type('Nguyen')
        cy.get('input[name=last_name]').type('Tuan')
        cy.get('a.select2-choice.ui-select-match.ng-scope').click()
        cy.get("ul.select2-result-single > li").eq(8).click()
        cy.get('button.btn.blue-custom.btn-sm.ng-binding').click()
        cy.get('div.ng-binding.ng-scope').should(($loi) => {
            expect($loi).to.contain('Trường này không được để trống.')
        })
      })

      // it('Nhap chuoi space vao email', function() {
      //   cy.wait(time)
      //   cy.get('input[name=password]').type('\ ')
      //   cy.get('input[name=first_name]').type('Nguyen')
      //   cy.get('input[name=last_name]').type('Tuan')
      //   cy.get('a.select2-choice.ui-select-match.ng-scope').click()
      //   cy.get("ul.select2-result-single > li").eq(6).click()
      //   cy.get('button.btn.blue-custom.btn-sm.ng-binding').click()
      //   cy.get('div.ng-binding.ng-scope').should(($loi) => {
      //       expect($loi).to.contain('Trường này không được để trống.')
      //   })
      // })
    })
  })
