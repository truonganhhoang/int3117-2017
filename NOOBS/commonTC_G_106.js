let delay =3000; // 3 seconds delay
describe('Upload file anh sai duong dan', function () {
    describe('Login with account: admin_agency_10@gmail.com', function() {
        it('Login ...', () => {
            cy.visit(Cypress.env("URL_LOGIN"));
        cy.get('input[name=email]').type(Cypress.env("USER_AGENCY");
        cy.get('input[name=password]').type(Cypress.env("LOGIN_PASSWORD"));
        cy.get('button[type=submit]').click();
    })
    })

    describe('Patient Management Module', function() {
        describe('Add New Patient', function () {
            it('Go to Module', function () {
                goToModule();
            } )
            it('Enter right info', function () {
                enterRightInfo();
            })
            it('Edit avatar directory', function () {
                editAvatarDirectory('sdfklsjlf');
                // check result
                cy.get('div[ng-switch]')
                    .find('.toast-message')
                    .should('contain', "Cập nhật thông tin thành công");
            })
        })
    })
    function enterRightInfo() {
        // cy.get('input[name=name]').first().type('Nguyen Ba Huu Chi');
        // cy.get('input[name=birth_date]').type('20/07/1996');
        // cy.get('.select2-chosen').first().click();
        // cy.wait(delay);
        // cy.get('.select2-highlighted').first().click();
        // cy.get('input[name=mobile_phone]').type('0123456789');
        // cy.get('input[name=admission_date]').type('16/08/2017');
        cy.get('div[name=ward_id]').first().click();
        Cypress.$('#ui-select-choices-row-48-2 > div').click();
    }
    function goToModule() {
        cy.wait(delay);
        cy.visit(Cypress.env("URL_ADD_NEW_PATIENT"));
        cy.wait(delay);
    }
    function editAvatarDirectory(newDir) {
        cy.get('.img-thumbnail').then(function($img){
            // edit the image dir
            $img.attr('src', newDir);
        });
        cy.get('button[type=submit]').first().click();
    }
})

