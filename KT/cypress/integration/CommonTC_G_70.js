describe('Kiểm tra giá trị ngày tháng lớn hơn ngày hiện tại', function() {
  beforeEach(function(){
    cy.visit('signin')
  })

  var currentdate = new Date();
  var dateOfBirth = currentdate.getDate() + '/' + (currentdate.getMonth() + 1) + '/' + (currentdate.getFullYear() + 1)

  it("Đăng nhập tài khoản admin", function() {
    //Login
    cy.get('input[name=email]').type(Cypress.env('USER_AGENCY'))
    cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'))
    cy.get('button[type=submit]').click()
    cy.url().should('include','main/dashboard1')
    cy.wait(500)

    // Redirect to patient manager
    cy.contains('Quản lý bệnh nhân').click()
    cy.wait(500)

    // Click button Sua
    cy.get('a[class=ng-scope]').first().click()
    cy.wait(500)
    cy.get('input[name=birth_date]').clear()
    cy.get('input[name=birth_date]').type(dateOfBirth).blur()
    cy.get('div').should('contain', 'Vui lòng nhập ngày nhỏ hơn ngày hiện tại')
  })
})
