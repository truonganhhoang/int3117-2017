describe('My First Test', function(){
    it('Đăng nhập ', function(){
        cy.fixture('users').then((user) =>{
          cy.visit('/signin');
          cy.get('input[name=email]').type(user.doctor.email);
          cy.get('input[name=password]').type(user.doctor.password);
          cy.get('button[type=submit]').click();
          cy.wait(delay);
        })
    })
    it('Chuyển đến trang thêm mới bệnh nhân', function () {
          cy.wait(delay)
          cy.visit('/main/patients/new')
      })

    it('Kiem tra so luong va sap xep cac gia tri combo-box', function(){
      //cy.wait(delay)
      cy.get('div.ui-select-container:nth-child(3) > a:nth-child(1)').first().click()

      var values = [];
      cy.get('div.ui-select-container:nth-child(3) > a:nth-child(1)').within(function(){
        
        cy.get('ul>li>div>span').each(function($span, index, $spans){// Iterate through each 'li'
          values.push($span.text())
        //  console.log(values)
        }).then(() => {
          console.log(values)
          console.log(alphabet(values))
          console.log(alphabet([1, 2, 2, 1]))
          //check day co theo alphabet
          assert.isTrue(alphabet(values));
          console.log('ok')
        })        
      })
    })
  })

var alphabet = function(a){
  var b = a.concat();
  b.sort(function(x, y) { 
      return x.toString().localeCompare(y);
  });
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