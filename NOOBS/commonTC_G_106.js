let delay = 3000; // 3 seconds delay
describe('Upload file anh sai duong dan', function () {
    describe('Login with account: admin_agency_10@gmail.com', function () {
        describe('Patient Management Module', function () {
            describe('Add New Patient', function () {
                it('Login...', function () {
                    logIn();
                })
                it('Go to Module', function () {
                    goToModule('URL_ADD_NEW_PATIENT');
                })
                it('Enter right info', function () {
                    enterRightInfo(true);
                })
                it('Edit avatar directory', function () {
                    editAvatarDirectory('sdfklsjlf');
                    cy.wait(delay);
                    // check result
                    cy.get('div[ng-switch]')
                        .find('.toast-message')
                        // .should('contain', "Cập nhật thông tin thành công");
                        .should('contain', "Tạo mới thành công");
                })
            })
            describe('Edit Patient Info', function () {
                it('Login...', function () {
                    logIn();
                })
                it('Go to Module', function () {
                    goToModule('URL_EDIT_INFO_PATIENT_405');
                })
                it('Enter right info', function () {
                    enterRightInfo(false);
                })
                it('Edit avatar directory', function () {
                    editAvatarDirectory('sdfklsjlf');
                    cy.wait(delay);
                    // check result
                    cy.get('div[ng-switch]')
                        .find('.toast-message')
                        .should('contain', "Cập nhật thông tin thành công");
                    // .should('contain', "Tạo mới thành công");
                })
            })
        })
    })
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const rand = getRandomInt(1, 99)

function goToModule(url) {
    cy.wait(delay);
    cy.visit(Cypress.env(url));
    cy.wait(delay);
}

function editAvatarDirectory(newDir) {
    cy.get('.img-thumbnail').then(function ($img) {
        // edit the image dir
        $img.attr('src', newDir);
    });
    cy.get('button[type=submit]').first().click();
}

function logIn() {
    cy.visit(Cypress.env("URL_LOGIN"));
    cy.get('input[name=email]').type(Cypress.env("USER_AGENCY"));
    cy.get('input[name=password]').type(Cypress.env("LOGIN_PASSWORD"));
    cy.get('button[type=submit]').click();
}
function enterRightInfo(isNewUser) {
    if (isNewUser) {
        cy.get('input[name=name]').first().type('NOOBS' + rand);
        cy.get('input[name=birth_date]').type('20/07/1996');
        cy.get('.select2-chosen').first().click();
        cy.wait(delay);
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
}
