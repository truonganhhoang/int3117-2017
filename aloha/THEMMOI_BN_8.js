const delay = 2000
describe('THEMMOI_BN_8', function () {
  describe('Kiểm tra textbox họ tên', function () {
    describe('Dang nhap', function() {
      it('Dang nhap bang tai khoan admin_agency', function () {
        cy.visit('/signin')
        cy.get('input[name=email]').type(Cypress.env('USER_AGENCY'))
        cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'))
        cy.get('button[type=submit]').click()
      })
    })

    describe('Kiểm tra là trường bắt buộc', function(){
      it('Chuyển đến trang đăng ký bệnh nhân', function() {
        cy.wait(delay)
        cy.visit('/main/patients/new')
        cy.wait(delay)
      })

      it('Để trống trường dữ liệu', function() {
        cy.get('button[type=submit]').first().click()
        cy.get('div.ng-binding.ng-scope').should('contain', 'Trường này không được để trống')
      })

      it('Set focus trường lỗi', function() {
        cy.get('div.col-xs-12.col-md-3').eq(1).find('input').type('27/07/1777')
        cy.get('html').click()
        cy.get('div.col-xs-12.col-md-3').eq(2).find('a').click()
        cy.get('li#ui-select-choices-row-13-0').first().click()
        cy.get('div.col-xs-12.col-md-3').eq(9).find('input').type('29/09/1999')
        cy.get('html').click()
        cy.get('div.col-xs-12.col-md-3').eq(12).find('a').click()
        cy.get('li#ui-select-choices-row-21-0').first().click()
        cy.get('div.col-xs-12.col-md-3').eq(16).find('a').click()
        cy.get('li#ui-select-choices-row-24-0').first().click()
        cy.get('div.col-xs-12.col-md-3').eq(18).find('a').click()
        cy.get('li#ui-select-choices-row-25-0').first().click()
        cy.get('div.col-xs-12.col-md-3').eq(19).find('input').type('13879428')
        cy.get('div.col-xs-12.col-md-3').eq(20).find('input').type('28/08/1888')
        cy.get('html').click()
        cy.get('div.col-xs-12.col-md-3').eq(21).find('input').type('Cà mau')
        cy.get('div.col-xs-12.col-md-3').eq(22).find('input').type('Aloha')
        cy.get('div.col-xs-12.col-md-3').eq(23).find('a').click()
        cy.get('li#ui-select-choices-row-26-0').first().click()
        cy.get('button[type=submit]').first().click()
        cy.focused().should('have.attr', 'ng-model', 'patient.name')
      })
    })
  })
})
