// Kiem tra gia tri mac dinh

describe('THEMMOI_BN_55', function(){ 

	it('.should() - assert that <url> is correct', function(){
		cy.visit('http://13.76.80.144/signin')
		cy.url().should('include', 'signin')
	})



	context('Window', function(){       
		beforeEach(function(){

			// Login Methadone     
			cy.get('.content').within(function(){
				cy.get('input:first').type(Cypress.env("USER_DOCTOR")).should('have.value', 'doctor_10@gmail.com')
           			cy.get('input:last').type(Cypress.env("PASSWORD")).should('have.value', 'Methadone@2017')
            			cy.get('.btn').click()
			})

			//  Vao trang quan ly benh nhan
			cy.get('.page-sidebar').within(function(){
				cy.get('ul a[href="/main/patients"]').click()
			})

			// Vao trang them benh nhan
			cy.get('.inputs').within(function(){
				cy.get('a[href="/main/patients/new"]').click()
			})	 
		})
			
		it('THEMMOI_BN_55', function(){
			// Kiem tra gia tri mac dinh
			cy.get('form .portlet-body').within(function(){
				cy.get('input[name="referral_agency"]').should('have.value', '')
			})	                                                                                                                 
		})	       
	})
})

