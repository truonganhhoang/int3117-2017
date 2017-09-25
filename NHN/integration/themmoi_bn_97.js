const delay = 2000
const homeLink = 'http://13.76.80.144';
const signinLink = homeLink + '/signin';
const newpatientsLink = homeLink + '/main/patients/new';

describe('My First Test', function(){
	describe('Đăng nhập ', function() {
		it('Đăng nhập ', function(){
		    cy.visit(signinLink)
		    cy.get('input[name=email]').type('doctor_10@gmail.com')
		    cy.get('input[name=password]').type('Methadone@2017')
				cy.get('button[type=submit]').click()
		  })
	})

	describe('Thêm mới bệnh nhân ', function(){
		it('Chuyển đến trang thêm mới bệnh nhân', function () {
        cy.wait(delay)
      	cy.visit(newpatientsLink)
    })

		it('Check giá trị mặc định của combobox quận huyện tạm trú', function(){
			cy.wait(delay)
			cy.get('.ui-select-container[ng-model="patient.resident_district_id"]').within(function(){
				cy.get('a').should('have.attr','placeholder','-- Vui lòng chọn --')//its('value').should('eq','--Vui lòng chọn')
			})
		})

	/*	it('Kiểm tra số lượng và sắp xếp các giá trị trong combo', function(){
			//cy.wait(delay)
		})

		it('Kiểm tra căn lề', function(){

		})

		it('Kiểm tra thông tin bắt buộc',function(){

		})*/


	/*	it('Check chuc nang tim kiem tren combobox', function(){
			cy.get('.ui-select-container[ng-model="patient.resident_district_id"]').click()
				.find('input[ng-model="$select.search"]').type(resident_ward_id)
			//cy.get('.ui-select-container[ng-model="patient.province_id"]').first()
			//	  .find('li[role="option"]')//click()
		//	cy.get('.ui-select-container[ng-model="patient.resident_district_id"]').select('Ba Đình')
		})*/


	})
})
