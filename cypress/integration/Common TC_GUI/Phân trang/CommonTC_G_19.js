const delay = 2000
describe('CommonTC_G_16', function () {
  describe('Kiem tra vi tri trang sau khi thuc hien 1 thao tac tren trang du lieu', function () {
    describe('Dang nhap', function() {
      it('Dang nhap bang tai khoan admin', function () {
        cy.visit(Cypress.env('LOGIN_URL'))
        cy.get('input[name=email]').type('admin_10@gmail.com')
        cy.get('input[name=password]').type('Methadone@2017')
        cy.get('button[type=submit]').click()
      })
    })

    describe('Đang ở trang thứ 2', function(){
      it('Redirect...', function() {
        cy.wait(delay)
        cy.visit('/main/admin/administrators?page=2')
        cy.url().should('contain','page=2')
      })

      it('Xóa bản ghi trang thứ 2', function() {
        cy.wait(delay)
        cy.get('i.fa.fa-trash-o').click()
        cy.wait(delay)
        cy.get('button.btn.btn-primary').click()
        cy.url().should('contain','page=1')
      })
    })
  })
})
