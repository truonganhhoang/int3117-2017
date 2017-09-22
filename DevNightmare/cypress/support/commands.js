Cypress.Commands.add("doLoginAs", function(user){
	var cmd = Cypress.log({
		name: 'login',
		message: user.email,
		consoleProps: function(){
			return {
				'Do Login As': user.email
			}
		}
	})	

	cy.get("input[name='email']").type(user.email)
		.get("input[name='password']").type(user.password + '{enter}')

  cy.url().should('not.include', '/signin')
})
