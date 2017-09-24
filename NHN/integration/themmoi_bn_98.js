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

		it('Kiem tra so luong va sap xep cac gia tri combo', function(){
			//cy.wait(delay)
			cy.get('div[ng-model="patient.resident_district_id"]').first().click()
			cy.get('div[ng-model="patient.resident_district_id"]').within(function(){
				var values = [];
				cy.get('ul>li>div>span').each(function($span, index, $spans){// Iterate through each 'li'
					values.push($span.text())
				//	console.log(values)
				})
				console.log(values)
				console.log(alphabet(values))
				console.log(alphabet([1, 2, 2, 1]))
				//check day co theo alphabet
				assert.isTrue(alphabet(values));
				console.log('ok')
				//}
			})
		})
	})
})

var alphabet = function(a){
	var b = a.concat();
	b.sort();
	console.log(a)
	console.log(b)
	return arrayEquals(a, b)
}

var arrayEquals = function(a, b){
	if (a === b) return true;
  	if (a == null || b == null) return false;
  	if (a.length != b.length) return false;

	for (var i = 0; i < a.length; ++i) {
    	if (a[i] !== b[i]) return false;
  	}
  
  	return true;
  }