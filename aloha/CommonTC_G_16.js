const delay = 2000
describe('CommonTC_G_16', function () {
  describe('Kiem tra vi tri trang sau khi thuc hien 1 thao tac tren trang du lieu', function () {
    describe('Dang nhap', function() {
      it('Dang nhap bang tai khoan admin', function () {
        cy.visit('/signin')
        cy.get('input[name=email]').type('admin_10@gmail.com')
        cy.get('input[name=password]').type('Methadone@2017')
        cy.get('button[type=submit]').click()
      })
    })

    describe('Quan ly nguoi dung', function(){
      it('Dang o trang thu 2', function() {
        cy.wait(delay)
        cy.visit('/main/admin/administrators?page=2')
        cy.url().should('contain','page=2')
      })

      it('Click vao nut "Them moi"', function() {
        cy.wait(delay)
        cy.get('a.btn.blue-custom.btn-sm.ng-binding').click()
        cy.get('h3.modal-title.text-bold-header.ng-binding').should('contain', 'Tạo tài khoản trưởng cơ sở')
      })

      it('Click vao nut "Close"', function() {
        cy.wait(delay)
        cy.get('input[type=button]').click()
        cy.url().should('contain', 'page=1')
      })
    })
  })
})
