describe('sfsdfsf', function() {
  it('Dang nhap', function() {
    cy.visit('signin')
    cy.wait(500)
    cy.get('input[name=email]').type(Cypress.env('USER_AGENCY'))
    cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'))
    cy.get('button[type=submit]').click()
    cy.wait(500)
    cy.url().should('include', 'main/dashboard1')

    var header = cy.get('.page-header > .page-header-inner > .title')
    console.log(header);
  })
})
