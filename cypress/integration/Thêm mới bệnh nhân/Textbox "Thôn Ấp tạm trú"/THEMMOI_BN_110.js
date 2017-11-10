//author NoBi
//..
var delay = 3000;
describe('Kiem tra nhap qua maxLenght', function () {
    describe('Use account agency', function () {
        it('Login ...', function () {
            cy.visit(Cypress.env("URL_LOGIN"))
                .get('input[name=email]').type(Cypress.env("USER_AGENCY"))
                .get('input[name=password]').type(Cypress.env("PASSWORD_FOR_USER_AGENCY")).type('{enter}')
                .wait(delay)
                .visit(Cypress.env("URL_EXECUTIVE_INFO"))
                .wait(delay)
            cy.get("input[ng-model=keyword]").focus().type("dm tuangggggggggdffffffffffffff" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fdggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fgggggggggggggggggggggggggggggggggggv" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "fggggggggggggggggggggggggggggggggggg" +
                "trung thu vui ve");
            cy.get("input[ng-model=keyword]").then(function ($i) {
                //cy.get("input[ng-model=keyword]").focus().type(($i.val().length));
                expect($i.val().length).to.equal(255)

            });
        })
    })
})