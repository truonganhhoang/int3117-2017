//  Kiem tra la truong khong bat buoc

describe('delete_function', function(){ 
	it('.should() - assert that <url> is correct', function(){
		cy.visit('http://13.76.80.144/signin')
		cy.url().should('include', 'signin')
	})



	context('Window', function(){       
		beforeEach(function(){

			// Login Methadone     
			cy.get('.content').within(function(){
				cy.get('input:first').type('doctor_10@gmail.com').should('have.value', 'doctor_10@gmail.com')
           			cy.get('input:last').type('Methadone@2017').should('have.value', 'Methadone@2017')
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


			// Nhap cac du lieu bat buoc
			const $node = cy.get('form .portlet-body')
			$node.get('input[ng-model="patient.name"]').first().type('Hope Star')

			$node.get('input[ng-model="patient.birthdate"]').type('27/5/1996')

			$node.get('div[ng-model="patient.gender"]').click()
				.find('li[role="option"]').first().click()

			$node.get('div[ng-model="patient.gender"]').click()
				.find('li[role="option"]').first().click()

			$node.get('input[ng-model="patient.admission_date"]').type('1/10/2017')


			$node.get('div[ng-model="patient.province_id"]').first().click()
				.find('li[role="option"]').first().click()

			$node.get('div[ng-model="patient.district_id"]').first().click()
				.find('li[role="option"]').first().click()

			$node.get('div[ng-model="patient.ward_id"]').first().click()
				.find('li[role="option"]').first().click()


			$node.get('div[ng-model="patient.resident_province_id"]').first().click()
				.find('li[role="option"]').first().click()

			$node.get('div[ng-model="patient.resident_district_id"]').first().click()
				.find('li[role="option"]').first().click()

			$node.get('div[ng-model="patient.resident_ward_id"]').first().click()
				.find('li[role="option"]').first().click()


			$node.get('div[ng-model="patient.identification_type"]').first().click()
				.find('li[role="option"]').first().click()

			const rd = Math.floor((Math.random() * 999999999)+1)
			$node.get('input[ng-model="patient.identification_number"]').first().type(rd)

			$node.get('input[ng-model="patient.identification_issued_date"]').type('27/5/2015')

			$node.get('input[ng-model="patient.identification_issued_by"]').type('Hà Nội')

			$node.get('input[ng-model="contact.name"]').first().type('Hoàng Thanh Hằng')

			$node.get('div[ng-model="contact.contact_type"]').first().click()
				.find('li[role="option"]').eq(3).click()

		})
			
		// Kiem tra khong phai gia tri mac dinh
		it('THEMMOI_BN_56', function(){
			// Khong nhap du lieu Text box Noi gioi thieu

			// Tao benh nhan
			cy.get('form button[type="submit"]').first().click()                                                                                                   

			// Check dialog
			cy.get('#toast-container').within(function(){
				cy.get('div[aria-label="Tạo mới thành công"]').should('contain', 'Tạo mới thành công')  
			})
		})	



        
	})
})