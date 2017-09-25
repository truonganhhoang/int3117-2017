var delay = 3000;
describe('TC_GUI', function() {
    context('Them moi banh nhan', function(){
        beforeEach(function(){
            cy
            .visit(Cypress.env("USER_LOGIN"))
            .get('input[name=email]').type(Cypress.env("USER_DOCTOR"))
            .get('input[name=password]').type(Cypress.env("LOGIN_PASSWORD"))
            .type('{enter}')
            .wait(delay)
            .visit(Cypress.env("URL_ADD_NEW_PATIENT"))
            .wait(delay)
        })
    
        it('THEMMOI_BN_105 --> Kiem tra thong tin bat buoc',function(){

            cy.fixture('sample_data').then(patient => {
                cy.get('input[ng-model="patient.name"]').first().type(patient.name)
                
                cy.get('input[ng-model="patient.birthdate"]').type(patient.birth_date)
                cy.pause()

                cy.get('input[ng-model="patient.admission_date"]')
                // .type(patient.admission_date)
                
                
                cy.get('div[ng-model="patient.gender"]')
                .click()
                .find('li[role="option"]').contains(patient.gender).first().click();

                cy.get('div[ng-model="patient.province_id"]')
                .first()
                .click()
                .find('li[role="option"]').contains(patient.province_id).first().click();

                cy.get('div[ng-model="patient.district_id"]')
                .first()
                .click()
                .find('li[role="option"]').contains(patient.district_id).first().click();

                cy.get('div[ng-model="patient.ward_id"]')
                .first()
                .click()
                .find('li[role="option"]').contains(patient.ward_id).first().click();

                cy.get('div[ng-model="patient.resident_province_id"]')
                .first()
                .click()
                .find('li[role="option"]').contains(patient.resident_province_id).first().click();

                cy.get('div[ng-model="patient.resident_district_id"]')
                .first()
                .click()
                .find('li[role="option"]').contains(patient.resident_district_id).first().click();

                cy.get('div[ng-model="patient.identification_type"]')
                .first()
                .click()
                .find('li[role="option"]').contains(patient.identification_type).first().click();

                cy.get('input[ng-model="patient.identification_number"]').first().type(patient.identification_number)
                cy.get('input[ng-model="patient.identification_issued_date"]').first().type(patient.identification_issued_date)
                cy.get('input[ng-model="patient.identification_issued_by"]').first().type(patient.identification_issued_by)
                
                      // nguoi than
                cy.get('input[ng-model="contact.name"]').first().type(patient.contacts[0].name)
                cy.get('div[ng-model="contact.contact_type"]')
                .first()
                .click()
                .find('li[role="option"]').contains( patient.contacts[0].contact_type).first().click();
            //   cy.doSelect2('div[ng-model="contact.contact_type"]', patient.contacts[0].contact_type)

                cy.get('button[type="submit"]').first().click()
                .wait(delay)

                cy.get('div[ng-message="required"').should('contain','Trường này không được để trống.')
        })
    })
})
})