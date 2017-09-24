const delay = 2000
describe('My First Test', function(){
	describe('Đăng nhập ', function() {
		it('Đăng nhập ', function(){
		    cy.visit('http://13.76.80.144/signin')
		    cy.get('input[name=email]').type('doctor_10@gmail.com')
		    cy.get('input[name=password]').type('Methadone@2017')
				cy.get('button[type=submit]').click()
		  })
	})

	describe('Thêm mới bệnh nhân ', function(){
		it('Chuyển đến trang thêm mới bệnh nhân', function () {
        cy.wait(delay)
      	cy.visit('http://13.76.80.144/main/patients/new')
    })

		it('Check giá trị mặc định của combobox quận huyện tạm trú', function(){
			cy.wait(delay)
			cy.get('.ui-select-container[ng-model="patient.resident_district_id"]').within(function(){
				cy.get('a').should('have.attr','placeholder','-- Vui lòng chọn --')//its('value').should('eq','--Vui lòng chọn')
			})
		})

	})
})

