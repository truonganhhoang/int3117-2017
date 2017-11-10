const delay = 2000
const _ = require('lodash');
describe('CommonTC_G_18', function () {
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

        describe('Đang ở trang thứ 2', function(){
          it('Redirect...', function() {
            cy.wait(delay)
            cy.visit(url.url)
            cy.url().should('contain','page=2')
          })

          it('Chọn một item và click vào delete', function() {
            cy.wait(delay)
            cy.get('i.fa.fa-trash-o').first().click()
            cy.get('div.modal-body').should('contain', 'Bạn chắc chắn muốn xóa')
          })

          it('Quay ve trang 1', function() {
            cy.wait(delay)
            cy.get('button.btn.btn-primary').click()
            cy.url().should('contain','page=1')
          })
        })
      })
    })
  })
})
