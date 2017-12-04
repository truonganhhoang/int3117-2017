const time = 1000

  describe('Kiem tra truong email la bat buoc nhap', function () {
    describe('Dang nhap', function() {
      it('Dang nhap bang tai khoan truong co so', function () {
        cy.visit('/signin')
        cy.get('input[name=email]').type('admin_agency_10@gmail.com')
        cy.get('input[name=password]').type('Methadone@2017')
        cy.get('button[type=submit]').click()
      })
    })

    describe('Quan ly nguoi dung', function(){
      it('Tham trang danh sach nguoi dung', function() {
        cy.wait(time)
        cy.visit('/main/admin_agency/users')    
      })

      it('Click vao nut "+Them"', function() {
        cy.wait(time)
        cy.get('a.btn.blue-custom.btn-sm.ng-binding').click()
      })
      
      it('Hien thi form tao tai khoan nhan vien co truong email', function() {
        cy.wait(time)
        cy.get('h3.modal-title.text-bold-header.ng-binding').should('contain', 'Tạo tài khoản nhân viên')
        cy.get('label.required').should(($label) => {
            expect($label).to.contain('Email:')
        })
      })

      it('Nhap email da ton tai', function() {
        cy.wait(time)
        cy.get('input[ng-model="user.email"]').type('admin_agency_5@gmail.com')
        cy.get('input[name=password]').type('abc123!@#')
        cy.get('input[ng-model="user.first_name"]').type('Nguyen')
        cy.get('input[ng-model="user.last_name"]').type('Tuan')
        cy.get('a.select2-choice.ui-select-match.ng-scope.select2-default').click()
        cy.get("ul.select2-result-single > li").eq(1).click()
        cy.get('button.btn.blue-custom.btn-sm.ng-binding').click()
        cy.get('div.toast-message').should(($loi) => {
            expect($loi).to.contain('Email của bạn đã tồn tại')
        })
        cy.get('input[ng-model="user.email"]').clear()
        cy.get('input[ng-model="user.email"]').focus()
      })
    })
  })
