describe('Kiem tra can le', function () {
    it('Login', function () {
        cy.visit(Cypress.env("signin"))
        cy.get('input[name=email]').type('doctor_10@gmail.com')
        cy.get('input[name=password]').type('Methadone@2017')
        cy.get('button[type=submit]').click()
        cy.wait(3000)
        cy.visit(Cypress.env("new"))
    })
    it("Chon tinh,huyen,xa", function () {
        cy
            .get("label.required")
            .contains("Tỉnh/Thành phố thường trú")
            .parent()
            .within(function () {
                cy.root().get(".ui-select-container").click()
            })
        // Chon thanh pho Ha Noi
        cy
            .get("#ui-select-choices-row-19-22")
            .click()
        cy
            .get("label.required")
            .contains("Huyện/Quận thường trú")
            .parent()
            .within(function () {
                cy.root().get(".ui-select-container").click()
            })
        // Chon quan/huyen Chuong My 
        cy
            .get("#ui-select-choices-row-20-4")
            .click()
        //Mo xa/thi tran thuong tru    
        cy
            .get("label.required")
            .contains("Xã/Thị Trấn thường trú")
            .parent()
            .within(function () {
                cy.root().get(".ui-select-container").click()
            })
    })
    it("Kiem tra", function () {
        cy.get('div[class="select2-result-label ui-select-choices-row-inner"]').first().and('have.css', 'text-align')
            .and('match', /left/)
    })
})