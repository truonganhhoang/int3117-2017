describe('My First Test ahjhj', function() {
  it('Visits the Kitchen Sink', function() {
    cy.visit('https://example.cypress.io')
    cy.contains('root').click()
    cy.url().should('include', '/commands/querying')
    cy.get('h1').should('contain', 'Querying')
    cy.pause()
    let h4_element = cy.get('h4')
    h4_element.should('contain', 'cy.contains()')
   h4_element.should('length',4)
  })
})