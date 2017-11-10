const delay = 1000

describe('Kiểm tra combo box sắp sếp theo alphabet', function(){
      describe('Đăng nhập ', function() {
            it('Đăng nhập với tài khoản bác sĩ và chuyển đến trang thêm mới bệnh nhân', function(){
                  cy.visit('/signin')
                  cy.get('input[name=email]').type('doctor_10@gmail.com')
                  cy.get('input[name=password]').type('Methadone@2017')
                  cy.get('button[type=submit]').click()
                  cy.url().should('include', '/main/doctor/dashboard')
                  cy.wait(delay)
                  cy.visit('/main/patients/new')
            })
      })

      describe('Thêm mới bệnh nhân ', function(){
            it("Kiểm tra giá trị của combo-boxđuợc sắp xếp alphabet", function(){
              cy.wait(delay)
              cy.get('div[ng-model="patient.jobs"]').first().click()
              var values = [];
              cy.get('div[ng-model="patient.jobs').within(function(){
                  cy.get('li>div>span').each(function($span, index, $spans){
                      values.push($span.text())
                  }).then(() => {
                      // console.log(values);
                      assert.isTrue(alphabet(values));
                  })              
            })
      })
})})
let alphabet = function(a){
    let b = a.concat();
    b.sort(function(x, y) { 
        return x.toString().localeCompare(y);
    });
    return arrayEquals(a, b)
}

let arrayEquals = function(a, b){
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
  }
