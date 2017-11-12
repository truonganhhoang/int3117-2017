describe('Kiem thu nhom BIs', function() {
  context('kiem tra combo-box "Dan toc"', function(){
		beforeEach(function(){
      cy.visit('/main/patients/new')
      cy.get('input[name=email]').type('doctor_10@gmail.com')
      cy.get('input[name=password]').type('Methadone@2017{enter}')
    })
  	it('Kiem tra gia tri mac dinh', function(){
      cy.url().should('include', '/main/doctor/dashboard')
			cy.wait(3000)
      cy.visit('/main/patients/new')
     	cy.wait(3000)
      cy.get("label").contains("Dân tộc").next().find('span.ng-binding.ng-scope')
      .should('have.text', '-- Vui lòng chọn --')
      
    })
  })
})

