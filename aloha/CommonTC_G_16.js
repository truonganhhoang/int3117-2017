const delay = 2000
const _ = require('lodash');
describe('CommonTC_G_16', function () {
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

          it('Click vao nut "Them moi"', function() {
            cy.wait(delay)
            if (url.pos == 1)
              cy.get('a.btn.blue-custom.btn-sm.ng-binding').click()
            else if (url.pos == 2)
              cy.get('a.btn.blue-custom.btn-sm.ng-binding').eq(1).click()
            cy.get('h3.modal-title.text-bold-header.ng-binding').should('contain', url.contain)
          })

          it('Click vao nut "Close"', function() {
            cy.wait(delay)
            cy.get('input[type=button]').click()
            cy.url().should('contain', 'page=1')
          })
        })
      })
    })
  })
})
