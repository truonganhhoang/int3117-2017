Cypress.Commands.add("doLoginAs", function(user) {
  cy.get("input[name='email']").type(user.email)
    .get("input[name='password']").type(user.password + '{enter}')

  cy.url().should('not.include', '/signin')
})

Cypress.Commands.add("doSelect2", function(selector, value) {
  cy.get(selector).click()
    .find('li[role="option"]').contains(value).first().click()
})

Cypress.Commands.add('doRandInt', function(left, right) {
  return Math.floor(Math.random() * right) + left
})
