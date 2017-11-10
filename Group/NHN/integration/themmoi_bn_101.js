const delay = 2000;

describe('My First Test', function(){
	describe('Đăng nhập ', function() {
		it('Đăng nhập ', function(){
		    cy.visit(Cypress.env('URL_LOGIN'))
		    cy.get('input[name=email]').type('doctor_10@gmail.com')
		    cy.get('input[name=password]').type('Methadone@2017')
				cy.get('button[type=submit]').click()
		  })
	})

	describe('Thêm mới bệnh nhân ', function(){
		it('Chuyển đến trang thêm mới bệnh nhân', function () {
	        cy.wait(delay)
      		cy.visit(Cypress.env('URL_NEW_PATIENT'))
	    })

		it('Check chuc nang tim kiem tren combobox', function(){
			cy.get('div[ng-model="patient.resident_district_id"]').click()
				 .find('input[ng-model="$select.search"]').type("Ba")

			var firstResult = "";
			cy.get('div[ng-model="patient.resident_district_id"]').within(function(){
				cy.get('ul>li>div>span').first().then(($span) => {
					firstResult = $span.text();
					console.log($span.text())
				});
			})

			cy.get('div[ng-model="patient.resident_district_id"]').find('input[ng-model="$select.search"]').type("{enter}")

		//	var comboboxResult = "";
			cy.get('div[ng-model="patient.resident_district_id"]').within(function(){
				cy.get('a>span>span').first().then(($span) => {
					expect($span.text()).to.contain(firstResult)
				//	assert.equal(firstResult, );
					console.log($span.text())
				});

				
			})

			console.log('ok')

		})


	})
})
