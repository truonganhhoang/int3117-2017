var delay = 3000;
describe('TC_GUI', function() {
    context('Them moi banh nhan', function(){
        beforeEach(function(){
            // login url
            cy.visit(Cypress.env("URL_LOGIN"))

            // read file users.json and login as doctor
            cy.fixture('users').then(users => {
                cy.login(users.doctor);
              })
            // visit add new patient link
            cy
            .visit(Cypress.env("URL_ADD_NEW_PATIENT"))
            .wait(delay)
            // .pause()
        })
    
        it('THEMMOI_BN_106 --> Kiem tra gia chuc nag tim kiem tren combo box',function(){

            cy.get('div[ng-model="patient.resident_ward_id"]')
            .first()
            .click()
            .find('input[type="search"]')
            .first()
            .type('d').as('entering')
            //  kiểm tra tự động high;ight vào dòng đầu tiên
            cy.get('li[role="option"]').first().should('have.class','select2-highlighted')
            cy.get('@entering').type('{enter}')
            cy.get('.ui-select-container[name=resident_ward_id]')
            .find('span').eq('2').should("contain",'Hoàng Diệu')

        })
    })
})