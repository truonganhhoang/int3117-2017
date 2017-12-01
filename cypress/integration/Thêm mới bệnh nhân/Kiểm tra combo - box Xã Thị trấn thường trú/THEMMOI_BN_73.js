describe('Kiem tra so luong va sap xep cac gia tri trong combo', function () {
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
        var values = [];
        cy.get('div[ng-model="patient.ward_id').within(function () {
            cy.get('li>div>span').each(function ($span, index, $spans) {
                values.push($span.text())
            }).then(() => {
                assert.isTrue(alphabet(values));
            })
        })
    })
})
let alphabet = function (a) {
    let b = a.concat();
    b.sort(function (x, y) {
        return x.toString().localeCompare(y);
    });
    return arrayEquals(a, b)
}
let arrayEquals = function (a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}