

describe('Common TC_GUI', function(){
	context('Numberic fields testing', function(){
		beforeEach(function(){
			cy.visit("/")
		})

		it('Assert sample url', function(){
			cy.url().should('include', '/signin')
		})
	})
})
