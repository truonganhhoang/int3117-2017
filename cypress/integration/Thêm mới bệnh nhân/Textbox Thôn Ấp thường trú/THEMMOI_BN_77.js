describe('Kiểm tra textbox "Thôn/Ấp thường chú"', function() {
  beforeEach(function(){
    cy.visit('signin')
  })

  it("Kiểm tra giá trị mặc định", function() {
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
    cy.contains('Thêm').click()
    cy.wait(500)
    cy.get('[ng-model="patient.hamlet"]').should('be.empty')
  })
})
