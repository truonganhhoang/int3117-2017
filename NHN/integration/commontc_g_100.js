describe('GUI Testing', function() {
	it('Starting', function() {
		cy.visit('http://13.76.80.144/signin')
		cy.get('input[name=email]').type('admin_agency_10@gmail.com')
		cy.get('input[name=password]').type('Methadone@2017{enter}')
		cy.wait(1234)

		cy.visit('http://13.76.80.144/main/patients/37/detail/executive_info')
	})

	it('Confirm before delete', function() {
		cy.get('tbody > tr:first-child .fa-trash-o').click()
		cy.get('.bootbox-body').should('contain', 'Bạn chắc chắn muốn xóa "')
	})
})