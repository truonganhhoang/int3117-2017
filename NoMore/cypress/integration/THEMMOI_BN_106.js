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
    
        it('THEMMOI_BN_106 --> Kiem tra gia chuc nag tim kiem tren combo box',function(){

            cy.get('div[ng-model="patient.resident_ward_id"]')
            .first()
            .click()
            .find('input[type="search"]')
            .first()
            .type('d').as('entering')

            cy.get('li[role="option"]').first().should('have.class','select2-highlighted')
            cy.get('@entering').type('{enter}')
            cy.get('.ui-select-container[name=resident_ward_id]')
            .find('span').eq('2').should(("contain",'                Hoàng Diệu              '))

        })
    })
})