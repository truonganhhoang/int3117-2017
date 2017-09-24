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

		it('Them du lieu benh nhan', function(){
			cy.fixture('new_patient').then(patient => {
				//Them ho ten
				cy.get('input[ng-model="patient.name"]').first().type(patient.name)

				//Them ngay sinh
				cy.get('input[ng-model="patient.birthdate"]').first().type(patient.birthdate)

				//Them gioi tinh
				cy.get('.ui-select-container[ng-model="patient.gender"]').click()
				  .find('li[role="option"]').contains(patient.gender).first().click()

				//Them ngay vao dieu tri
				cy.get('input[ng-model="patient.admission_date"]').first().type(patient.admission_date)

				//Them tinh/thanh pho thuong tru
				cy.get('.ui-select-container[ng-model="patient.province_id"]').first().click()
				  .find('li[role="option"]').contains(patient.province_id).first().click()

				//Them quan/huyen thuong tru 
				cy.get('.ui-select-container[ng-model="patient.district_id"]').first().click()
				  .find('li[role="option"]').contains(patient.district_id).first().click()
				
				//Them xa thuong tru 
				cy.get('.ui-select-container[ng-model="patient.ward_id"]').first().click()
				  .find('li[role="option"]').contains(patient.ward_id).first().click()

				//Them tinh/thanh pho tam tru
				cy.get('.ui-select-container[ng-model="patient.resident_province_id"]').first().click()
				  .find('li[role="option"]').contains(patient.resident_province_id).first().click()

				//Them quan huyen tam tru
				//cy.get('.ui-select-container[ng-model="patient.resident_district_id"]').click()
				//.find('li[role="option"]').contains("patient.resident_district_id").first().click()

				//Them xa tam tru 
				cy.get('.ui-select-container[ng-model="patient.resident_ward_id"]').first().click()
				  .find('input[ng-model="$select.search"]').type(patient.resident_ward_id + "{enter}")

				//Them CMND
				cy.get('.ui-select-container[ng-model="patient.identification_type"]').first().click()
				  .find('li[role="option"]').contains(patient.identification_type).first().click()

				cy.get('input[ng-model="patient.identification_number"]').first().type(patient.identification_number)
				cy.get('input[ng-model="patient.identification_issued_date"]').first().type(patient.identification_issued_date)
 			    cy.get('input[ng-model="patient.identification_issued_by"]').first().type(patient.identification_issued_by)

 			    //Them nguoi than
 			    cy.get('input[ng-model="contact.name"]').first().type(patient.contact_name)
				cy.get('.ui-select-container[ng-model="contact.contact_type"]').first().click()
				  .find('li[role="option"]').contains(patient.contact_type).first().click()
			})
			
			
		//	cy.get('.ui-select-container[ng-model="patient.resident_district_id"]').select('Ba Đình')
		})

		it('Click submit & Check bao loi', function(){
			//click submit
			cy.get('button[type=submit]').first().click()

			//check bao loi
			cy.get('div[ng-model="patient.resident_district_id"]').parent().within(function(){
				cy.get('div.text-error.ng-active').should('have.attr','ng-messages','form.resident_district_id.$error')
			})
				
		})


	})
})
