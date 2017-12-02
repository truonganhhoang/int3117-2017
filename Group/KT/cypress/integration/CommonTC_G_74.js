describe('Kiểm tra trường từ ngày bằng trường đến ngày', function() {
  beforeEach(function(){
    cy.visit('signin')
  })

  var currentdate = new Date();
  var fromDate = currentdate.getDate() + '/' + currentdate.getMonth() + '/' + currentdate.getFullYear()
  var toDate = fromDate

  it("Đăng nhập tài khoản admin", function() {
    //Login
    cy.get('input[name=email]').type(Cypress.env('USER_ADMIN'))
    cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'))
    cy.get('button[type=submit]').click()
    cy.url().should('include','main/dashboard1')
    cy.wait(500)

    // Redirect to patient manager
    cy.contains('Báo cáo tổng hợp').click()
    cy.wait(500)

    cy.get('input[name=from_date]').clear()
    cy.get('input[name=from_date]').type(fromDate)
    cy.get('input[name=to_date]').clear({force: true})
    cy.get('input[name=to_date]').type(toDate)
    cy.get('button[type=submit]').first().click()
    cy.get('div').should('contain', 'Vui lòng nhập ngày lớn hơn ngày bắt đầu')
  })
})
