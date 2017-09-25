/*
	Kiem tra gia tri mac dinh trong truong Tim kiem
	Ket qua mong muon: ""
*/


const expect = require('chai').expect;


describe('Kiem tra gia tri man hinh tim kiem', function () {
	// body...
	describe('Login', function(){
		it('Log in', function(){
			cy.visit('http://52.187.8.102/signin')
            cy.get('input[name=email]').type('admin_agency_10@gmail.com')
            cy.get('input[name=password]').type('Methadone@2017')
            cy.get('button[type=submit]').click()
		})

	})

	 describe('Quan Ly Benh Nhan', function(){
	 	it('Redirect ...', function () {
	 		cy.wait(3000)
			cy.visit('http://52.187.8.102/main/patients')
		})

		it('Kiem tra gia tri truong tim kiem mac dinh', function () {
            expect(Cypress.$('input').html()).to.deep.equal("");
        })
	 })
})