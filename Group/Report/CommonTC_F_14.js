// Tim kiem khi chon 1 gia tri radio

describe('CommonTC_F_14', function(){     
	
	it('.should() - assert that <url> is correct', function(){
		cy.visit('http://simcuatui.com/')
	})

	context('Window', function(){
			// Kiem tra url khi chon 1 gia tri radio
		it('Common TC_F_14', function(){
		 	// Chon gia tri Radio ngau nhien
			const num = Math.floor((Math.random() * 3))
			const value = '#search_form_type_'+num
		 	cy.get('.timsim').within(function(){
				cy.get(value).click()
				cy.get('input[type="submit"]').click()
			})

		 	//  Check url
		 	if(num==0)
		 		var test = '&key=&n=0'
		 	else if(num==1)
		 		var test = '&key=&n=10'
		 	else
		 		var test = '&key=&n=11'
		 	
			cy.url().should('include', test)

		})
	})
})