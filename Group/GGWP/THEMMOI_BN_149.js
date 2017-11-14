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
    it("Click Địa chỉ", function(){
        cy.wait(delay)
        cy.get('[ng-model="contact.address"]').prev().click()
    })
    it("So sanh", function(){
        cy.wait(delay)
        const str_default = Cypress.$("[name='district_id'] a span span").text().trim() + ' - ' + Cypress.$("[name='province_id'] a span span").text().trim();
        expect(Cypress.$('[ng-model="contact.address"]').val()).to.equal(str_default)
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
    it("Click Địa chỉ", function(){
        cy.wait(delay)
        cy.get('[ng-model="contact.address"]').prev().click()
    })
    it("So sanh", function(){
        cy.wait(delay)
        const str_default = Cypress.$("[name='district_id'] a span span").text().trim() + ' - ' + Cypress.$("[name='province_id'] a span span").text().trim();
        expect(Cypress.$('[ng-model="contact.address"]').val()).to.equal(str_default)
    })
})