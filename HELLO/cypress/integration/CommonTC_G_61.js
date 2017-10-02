describe('gfgdfg', function() {
  beforeEach(function(){
    cy.visit('signin')
  })

  it("Đăng nhập", function() {
    //Login
    cy.get('input[name=email]').type(Cypress.env('USER_AGENCY'))
    cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'))
    cy.get('button[type=submit]').click()
    cy.url().should('include','main/dashboard1')
    cy.wait(500)

    cy.contains('Quản lý bệnh nhân').click()
    cy.wait(500);

    cy.contains('Thêm đơn thuốc').click();
    cy.wait(500);

    cy.get('div[name=medicine_list_id]').should('contain', '-- Vui lòng chọn --')
  })
})
