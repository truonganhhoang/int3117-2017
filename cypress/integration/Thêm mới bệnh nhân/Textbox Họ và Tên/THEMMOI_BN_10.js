const delay = 2000
describe('THEMMOI_BN_10', function () {
  describe('Kiểm tra nhập quá maxlength', function () {
    describe('Dang nhap', function() {
      it('Dang nhap bang tai khoan admin_agency', function () {
        cy.visit(Cypress.env('LOGIN_URL'))
        cy.get('input[name=email]').type(Cypress.env('USER_AGENCY'))
        cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'))
        cy.get('button[type=submit]').click()
      })
    })

    describe('Kiểm tra nhập quá ký tự maxlength', function(){
      it('Chuyển đến trang đăng ký bệnh nhân', function() {
        cy.wait(delay)
        cy.visit('/main/patients/new')
        cy.wait(delay)
      })

      it('Nhập dữ liệu trường họ tên', function() {
        cy.get('i.fa.fa-search').first().click()
        cy.get('.modal-body').find('.form-group').eq(6).find('input').type('fiewjfioewjfioewjfioewjoifjewiofjewiofjoiewjfoiwejfiowejiofjewiofjewiojfiowejfioewjfioewjiofjewiofjewiofjioewjfoiewjfoiewjfioewjiofjewoifjewiofjeowijfioewjfioewjfioewjfoiewjfioewjfioewjfoiwejfio')
        cy.get('i.fa.fa-search').eq(1).click()
        cy.get('div.ng-binding.ng-scope').should('contain', 'Không được nhập quá nhiều ký tự')
      })
    })
  })
})
