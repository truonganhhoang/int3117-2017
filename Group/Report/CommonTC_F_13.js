// Tim kiem khi chon nhieu gia tri checkbox


describe('CommonTC_F_13', function(){     
	
	it('.should() - assert that <url> is correct', function(){
		cy.visit('http://simcuatui.com/')
	})

	context('Window', function(){
			// Kiem tra url khi chon nhieu gia tri checkbox
		it('Common TC_F_13', function(){
		 	// Chon gia tri Checkbox ngau nhien, neu bool < 1 gia tri checkbox se duoc chon
		 	var test = ''		 	
		 	for(var i=1; i<10; i++){
		 		var bool = Math.floor((Math.random() * 2))
		 		if(bool<1){
					const value = 'input[value="'+i+'"]'
					cy.get('.timsim').within(function(){
						cy.get(value).click()
					})
					test +=  '&exnu%5B%5D=' + i;
		 		}
	 			
		 	}

		 	cy.get('.timsim').find('input[type="submit"]').click()

		 	//  Check url
			cy.url().should('include', test)

		})
	})
})	