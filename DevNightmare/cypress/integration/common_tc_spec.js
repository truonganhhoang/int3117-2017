describe('Common TC_GUI', function(){

	context('Validate dữ liệu trường số', function(){

		beforeEach(function(){
			cy.visit("/signin")
		})

		it('Thêm đơn thuốc - liều lượng', function(){
			cy.fixture('users').then(users => {
				cy.doLoginAs(users.doctor)
			})

		})
	})
})
