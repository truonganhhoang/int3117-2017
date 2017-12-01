const delay = 2000
describe('THEMMOI_BN_7', function () {
  describe('Kiểm tra giá trị mặc định trường họ và tên', function () {
    describe('Dang nhap', function() {
      it('Dang nhap bang tai khoan admin_agency', function () {
        cy.visit(Cypress.env('LOGIN_URL'))
        cy.get('input[name=email]').type(Cypress.env('USER_AGENCY'))
        cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'))
        cy.get('button[type=submit]').click()
      })
    })

    describe('Kiểm tra trường họ tên thêm mới bệnh nhân', function(){
      it('Chuyển đến trang đăng ký bệnh nhân', function() {
        cy.wait(delay)
        cy.visit('/main/patients/new')
        cy.get('div.col-xs-12.col-md-3').find('.form-control').first().should('have.value', '')
      })
    })
  })
})
