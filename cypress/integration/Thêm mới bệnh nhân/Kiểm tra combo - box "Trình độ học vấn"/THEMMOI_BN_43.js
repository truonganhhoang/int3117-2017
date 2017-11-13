/**
 * fail
 * TC THEMMOI_BN
 * 
 * Co THEMMOI_BN
 * admin_agency_10@gmail.com
 * doctor_10@gmail.com
 *
 * khong co Combo Box
 * admin_10@gmail.com
 * nurse_10@gmail.com
 * storekeeper_10@gmail.com
 */

const delay = 3000
const doctor = "doctor_10@gmail.com";
const agency = "admin_agency_10@gmail.com";

describe(`Kiem tra Combo Box voi tai khoan ${agency}`, function(){
    it('Login ...', function() {
        cy.visit('/signin');
        cy.fixture('users').then(users => {
            cy.doLoginAs(users.agency);
        })
        cy.visit("/main/patients/new")
    })
    it("kiểm tra giá trị sap xep alphabet của combo-box Trình độ học vấn", function(){
        cy.wait(delay)
        cy.get("label").contains("Trình độ học vấn")
            .next().find('a.select2-choice').click()
        var values = [];
        cy.get('#ui-select-choices-17').within(function(){
            cy.get('li>div>span').each(function($span, index, $spans){
                values.push($span.text())
            }).then(() => {
                // console.log(values);
                assert.isTrue(alphabet(values));
            })              
        })
    })

})

describe(`Kiem tra Combo Box voi tai khoan ${doctor}`, function(){
    it('Login ...', function() {
        cy.visit('/signin');
        cy.fixture('users').then(users => {
            cy.doLoginAs(users.doctor);
        })
        cy.visit("/main/patients/new")
    })
    it("kiểm tra giá trị sap xep alphabet của combo-box Trình độ học vấn", function(){
        cy.wait(delay)
        cy.get("label").contains("Trình độ học vấn")
            .next().find('a.select2-choice').click()
        var values = [];
        cy.get('#ui-select-choices-17').within(function(){
            cy.get('li>div>span').each(function($span, index, $spans){
                values.push($span.text())
            }).then(() => {
                // console.log(values);
                assert.isTrue(alphabet(values));
            })              
        })
    })

})

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