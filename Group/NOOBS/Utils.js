const delay = 3000;

module.exports = {

    enterRightInfoToEditPatientInfo : function (isNewUser) {
        const rand= Math.floor(Math.random() * (99 ) + 1);
        if (isNewUser){
            cy.get('input[name=name]').first().type('NOOBS' + rand);
            cy.get('input[name=birth_date]').type('20/07/1996');
            cy.get('.select2-chosen').first().click();
            // cy.wait(delay);
            cy.get('.select2-highlighted').first().click();

            cy.get('input[name=mobile_phone]').type('0123456789');
            cy.get('input[name=admission_date]').type('16/08/2017{enter}');

            cy.get('div[name=ward_id]').first().click();
            cy.get('.select2-highlighted').first().click();


            cy.get('div[name=identification_type]').first().click();
            cy.get('.select2-highlighted').first().click();

            cy.get('input[name=identification_number]').first().type('1875656566' + rand);
            cy.get('input[name=identification_issued_date]').first().type('16/08/2010');
            cy.get('input[name=identification_issued_by]').first().type('CA tinh NA');
            cy.get('input[name=name]:eq(1)').type('Tran Thi Tuan');

            cy.get('div[name=contact_type]').first().click();
            cy.get('.select2-highlighted').first().click();
        }
        cy.get('div[name=resident_province_id]').first().click();
        cy.get('.select2-highlighted').first().click();

        cy.get('div[name=resident_district_id]').first().click();
        cy.get('.select2-highlighted').first().click();

        cy.get('div[name=resident_ward_id]').first().click();
        cy.get('.select2-highlighted').first().click();
    },
    getRandomInt : function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    goToModule: function (url) {
        cy.wait(delay);
        cy.visit(Cypress.env(url));
        cy.wait(delay);
    },
    logIn: function (email, password) {
        cy.visit(Cypress.env("URL_LOGIN"));
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);
        cy.get('button[type=submit]').click();
    }
}


