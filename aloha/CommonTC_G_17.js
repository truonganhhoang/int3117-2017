const delay = 2000
const _ = require('lodash');
describe('CommonTC_G_17', function () {
  _.forEach(Cypress.env('users'), function (user) {
    _.forEach(user.urls, function (url) {
      describe('Kiem tra vi tri trang sau khi thuc hien 1 thao tac tren trang du lieu', function () {
        describe('Dang nhap', function() {
          it('Dang nhap bang tai khoan admin', function () {
            cy.visit(Cypress.env('LOGIN_URL'))
            cy.get('input[name=email]').type(user.user.email)
            cy.get('input[name=password]').type(user.user.password)
            cy.get('button[type=submit]').click()
          })
        })

        describe('Quan ly nguoi dung', function(){
          it('Dang o trang thu 2', function() {
            cy.wait(delay)
            cy.visit(url.url)
            cy.url().should('contain','page=2')
          })

          it('Click vao nut "Edit"', function() {
            cy.wait(delay)
            cy.get('i.fa.fa-edit').first().click()
            cy.get('h3.modal-title.text-bold-header.ng-binding').should('contain', url.contain_edit)
          })

          it('Click vao nut "Save"', function() {
            cy.wait(delay)
            cy.get('button[type=submit]').click()
            cy.url().should('contain','page=1')
          })
        })
      })
    })
  })
})
