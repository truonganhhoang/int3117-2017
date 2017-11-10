// Tim kiem khi  chon 1 gia tri cua checbox

describe('CommonTC_F_12', function(){     
	
	it('.should() - assert that <url> is correct', function(){
		cy.visit('http://simcuatui.com/')
	})

	context('Window', function(){
			// Kiem tra url khi chon 1 gia tri checkbox
		it('Common TC_F_12', function(){
		 	// Chon gia tri Checkbox ngau nhien
			const num = Math.floor((Math.random() * 9)+1)
			const value = 'input[value="'+num+'"]'
		 	cy.get('.timsim').within(function(){
				cy.get(value).click()
				cy.get('input[type="submit"]').click()
			})

		 	//  Check url
		 	const test = '&exnu%5B%5D=' + num
			cy.url().should('include', test)

		})
	})
})