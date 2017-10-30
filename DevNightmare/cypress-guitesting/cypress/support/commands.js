Cypress.Commands.add("doLoginAs", function(user) {
  cy.get("input[name='email']").type(user.email)
    .get("input[name='password']").type(user.password + '{enter}')

  cy.url().should('not.include', '/signin')
})

Cypress.Commands.add("doSelect2", function(selector, value) {
  console.log(selector);
  cy.get(selector).click()
    .find('li[role="option"]').contains(value).first().click();
});

Cypress.Commands.add("mtCheckbox", function(selector, checked) {
	cy.get(selector).parents().first().click();
});

Cypress.Commands.add('doRandInt', function(left, right) {
  return Math.floor(Math.random() * right) + left
});

Cypress.Commands.add('randomString', function(length) {
	let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = '';
	for (let i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
	return result;
});

Cypress.Commands.add('checkFocusMessage', function(attribute, message) {
	cy.focused().should('have.attr', attribute, message);
});
