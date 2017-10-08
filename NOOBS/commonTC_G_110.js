let delay = 3000; // 3 seconds delay
let Utils = require('./Utils');

describe('Upload file co dinh dang gia', function () {
    describe('Module Quan ly benh nhan', function () {
        describe('Them moi benh nhan', function () {
            it('Dang nhap voi tai khoan '+ Cypress.env("USER_AGENCY"), function () {
                Utils.logIn(Cypress.env("USER_AGENCY"), Cypress.env("PASSWORD_FOR_USER_AGENCY"));
            })
            it('Den module', function () {
                Utils.goToModule('URL_ADD_NEW_PATIENT');
            })
            it('Nhap cac thong tin day du va hop le', function () {
                Utils.enterRightInfoToEditPatientInfo(true);
            })
            it('Upload file co dinh dang gia', function () {
                editAvatarDirectory('./test_image.desktop');
            })
            it ('Click Save', function () {
                cy.get('button[type=submit]').first().click();
                cy.wait(delay);
                // check result
                cy.get('div[ng-switch]')
                    .find('.toast-message')
                    // .should('contain', "Cập nhật thông tin thành công");
                    .should('contain', "Lỗi file không đúng định dạng");
            })
        })
        describe('Sua thong tin benh nhan', function () {
            it('Dang nhap voi tai khoan '+ Cypress.env("USER_AGENCY"), function () {
                Utils.logIn(Cypress.env("USER_AGENCY"), Cypress.env("PASSWORD_FOR_USER_AGENCY"));
            })
            it('Den Module', function () {
                Utils.goToModule('URL_EDIT_INFO_PATIENT_405');
            })
            it('Nhap cac thong tin day du va hop le\'', function () {
                Utils.enterRightInfoToEditPatientInfo(false);
            })
            it('Upload file co dinh dang gia', function () {
                editAvatarDirectory('./test_image.desktop');
            })
            it ('Click Save', function () {
                cy.get('button[type=submit]').first().click();
                cy.wait(delay);
                // check result
                cy.get('div[ng-switch]')
                    .find('.toast-message')
                    // .should('contain', "Cập nhật thông tin thành công");
                        .should('contain', "Lỗi file không đúng định dạng");
            })
        })
    })

})


function editAvatarDirectory(newDir) {
    cy.get('.img-thumbnail').then(function ($img) {
        // edit the image dir
        $img.attr('src', newDir);
    });
}

