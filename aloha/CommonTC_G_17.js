const delay = 2000
describe('CommonTC_G_17', function () {
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

      it('Click vao nut "Edit"', function() {
        cy.wait(delay)
        cy.get('i.fa.fa-edit').first().click()
        cy.get('h3.modal-title.text-bold-header.ng-binding').should('contain', 'Sửa tài khoản trưởng cơ sở')
      })

      it('Click vao nut "Save"', function() {
        cy.wait(delay)
        cy.get('button[type=submit]').click()
        cy.url().should('contain','page=1')
      })
    })
  })
})
