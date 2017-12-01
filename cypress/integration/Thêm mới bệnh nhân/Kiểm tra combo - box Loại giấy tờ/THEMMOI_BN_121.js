describe('Kiểm tra combobox "Loại giấy tờ"', function () {
    beforeEach(function () {
        cy.visit(Cypress.env("routes.signin"));
        cy.get('[name="email"]').type(Cypress.env("accounts.admin_agency.email"));
        cy.get('[name="password"]').type(Cypress.env("accounts.admin_agency.password"));
        cy.get('[type="submit"]').click();
        cy.wait(Cypress.env("delays.after_signin"));

        cy.visit(Cypress.env("routes.main.patients.new"));
        cy.wait(Cypress.env("delays.after_visit"));
    });

    it('Kiểm tra giá trị mặc định trường trường "Loại giấy tờ"', function () {
        cy.get('[ng-submit="form.$valid && createPatient()"] [name="identification_type"] [ng-show="$select.isEmpty()"').should('contain', '-- Vui lòng chọn --');
        cy.get('[ng-submit="form.$valid && createPatient()"] [name="identification_type"]').click();
        ['CMND', 'Sổ hộ khẩu', 'Giấy phép lái xe', 'Hộ chiếu'].forEach(function(option, i) {
            cy.get('[ng-bind-html="identification_type | translator: \'patient\' | highlight: $select.search"]').eq(i).should('contain', option);
        });
    });
});