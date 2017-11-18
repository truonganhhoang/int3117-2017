const delay = 2000
describe('THEMMOI_BN_13', function () {
  describe('Kiểm tra textbox họ tên', function () {
    describe('Dang nhap', function() {
      it('Dang nhap bang tai khoan admin_agency', function () {
        cy.visit(Cypress.env('LOGIN_URL'))
        cy.get('input[name=email]').type(Cypress.env('USER_AGENCY'))
        cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'))
        cy.get('button[type=submit]').click()
      })
    })

    describe('Kiểm tra nhập tiếng việt có dấu', function(){
      it('Chuyển đến trang đăng ký bệnh nhân', function() {
        cy.wait(delay)
        cy.visit('/main/patients/new')
        cy.wait(delay)
      })

      it('Nhập dữ liệu là chữ tiếng việt có dấu', function() {
        cy.get('div.col-xs-12.col-md-3').eq(0).find('input').type('Xin chào')
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
        cy.get('td.align-left.ng-binding').eq(1).should('contain', 'Xin chào')
        cy.get('i.fa.fa-trash-o').first().click()
        cy.get('div.modal-footer > button.btn.btn-primary').first().click()
      })
    })
  })
})
