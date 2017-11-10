/**
 * pass
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
    it("Gia tri duoc can le trai của combo-box Trình độ học vấn", function(){
        cy.wait(delay)
        cy.get("label").contains("Trình độ học vấn")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-17')
            .and('have.css', 'text-align')
            .and('match', /left/)
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
    it("Gia tri duoc can le trai của combo-box Trình độ học vấn", function(){
        cy.wait(delay)
        cy.get("label").contains("Trình độ học vấn")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-17')
            .and('have.css', 'text-align')
            .and('match', /left/)
    })
})