describe('Kiểm tra giá trị ngày vào viện lớn hơn ngày sinh', function() {
  beforeEach(function(){
    cy.visit('signin')
  })

  var currentdate = new Date();
  var dateOfBirth = (currentdate.getDate() - 1) + '/' + (currentdate.getMonth() + 1) + '/' + currentdate.getFullYear()
  var admissionDate = (currentdate.getDate()) + '/' + (currentdate.getMonth() + 1) + '/' + currentdate.getFullYear()

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
    cy.get('input[name=admission_date]').clear({force: true})
    cy.get('input[name=admission_date]').type(admissionDate)
    cy.get('button[type=submit]').first().click()
    cy.get('div').should('contain', 'Vui lòng nhập ngày lớn hơn ngày sinh')
  })
})
