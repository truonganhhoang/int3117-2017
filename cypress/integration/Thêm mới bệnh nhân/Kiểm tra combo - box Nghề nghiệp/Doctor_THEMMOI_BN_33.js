const time = 2000
describe("kiểm tra combo-box nghề nghiệp", function(){
	 	beforeEach(function(){
			cy.visit('/signin')
			cy.get("input[name=email]").type('doctor_10@gmail.com')
			cy.get("input[name=password]").type('Methadone@2017')
			cy.get("button[type=submit]").click()
		})
	
	
		it("kiểm tra giá trị mặc định: Vui lòng chọn", function(){
			cy.url().should('include', '/main/doctor/dashboard')
			cy.wait(time)
			cy.visit("/main/patients/857/detail/executive_info")
			cy.visit("/main/patients/new")
        		cy.get("label").contains("Nghề nghiệp").next().find('a.select2-choice').should('have.attr', 'placeholder', '-- Vui lòng chọn --')	
		})
	
})






























			
