// Kiem tra viec huy bo thao tac

describe('Common TC_F_16', function(){ 

	it('.should() - assert that <url> is correct', function(){
		cy.visit('http://13.76.80.144/signin')
		cy.url().should('include', 'signin')
	})


	context('Window', function(){
		beforeEach(function(){

			// Login Methadone
			cy.get('.content').within(function(){
				cy.get('input:first').type('admin_10@gmail.com').should('have.value', 'admin_10@gmail.com')
           			cy.get('input:last').type('Methadone@2017').should('have.value', 'Methadone@2017')
            			cy.get('.btn').click()
			})

			//  Vao trang co so quan ly
			cy.get('.page-sidebar').within(function(){
				cy.get('a[href="/main/admin/administrators/issuing_agency"]').click()
			})
		})

			// Kiem tra viec huy bo thao tac
		it('Common TC_F_16', function(){
		 	
		 	// Click vao nut xoa de xem thong bao muon xoa

		 	cy.get('tbody').within(function(){		 				 		
				cy.get('tr:first  td:last a ').click()
			})


		 	// Click vao nut Cancle
			cy.get('.modal-content').within(function(){
				cy.get('button[data-bb-handler="cancel"]').click()
			})

			cy.get('tbody').within(function(){
				cy.get('tr:first').find('td').eq(1).should('have.value', "")
			})


		})

	})
})