let delay =3000; // 3second delay trang mang lag
describe('Upload file anh sai duong dan', function () {
    describe('Dang nhap bang tai khoan admin_agency_10@gmail.com', () => {
        it('Login ...', () => {
            cy.visit(Cypress.env("host"))
            cy.get('input[name=email]').type('admin_agency_10@gmail.com')
            cy.get('input[name=password]').type('Methadone@2017')
            cy.get('button[type=submit]').click()
        })
    })

    describe('Vao module Quan Ly Benh Nhan', () => {
        it('Chinh sua duong dan anh', () => {
            cy.wait(delay);
            cy.visit(Cypress.env("edit_info_patient_504"));
            cy.wait(delay);
            cy.get('.img-thumbnail').then(function($img){
                // append the image
                $img.attr('src', 'sdfsfsdfs');
            });
            cy.get('button[type=submit]').first().click();
            cy.get('div[ng-switch]')
                .find('.toast-message')
                .should('contain', "Cập nhật thông tin thành công");
        })
    })

})

