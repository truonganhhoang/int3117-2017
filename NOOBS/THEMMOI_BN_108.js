var delay = 3000;
describe('Kiem tra la truong khong bat buoc', function () {
    describe('Use account admin_agency_10@gmail.com', function () {
        it('Login ...', function () {
            cy.visit(Cypress.env("URL_LOGIN"))
                .get('input[name=email]').type(Cypress.env("USER_AGENCY"))
                .get('input[name=password]').type(Cypress.env("PASSWORD_FOR_USER_AGENCY")).type('{enter}')
                .wait(delay)
                .visit(Cypress.env("URL_ADD_NEW_PATIENT"))
                .wait(delay)
        })

        it('Enter required field', function () {
            cy
                .get("label").contains("Họ và tên").parent().within(function () {
                cy.get("input").focus().type("Nguyen Van A")
            })

                .get("input[name='birth_date']").focus().type("01/01/2000{enter}")

                .get("label").contains("Giới tính").parent().within(function () {
                cy.get("a").click()
            })

                .get("#ui-select-choices-13").find("li").first().click()

                .get("input[name='admission_date']").focus().type("01/11/2010{enter}")

                .get("label").contains("Tỉnh/Thành phố thường trú").parent().within(function () {
                cy.get("a").click()
            })

                .get("#ui-select-choices-19").find("li").first().click()

                .get("label").contains("Huyện/Quận thường trú").parent().within(function () {

                cy.get("a").click()

            })

                .get("#ui-select-choices-20").find("li").first().click()

                .get("label").contains("Xã/Thị Trấn thường trú").parent().within(function () {
                cy.get("a").click()
            })

                .get("#ui-select-choices-21").find("li").first().click()

                .get("label").contains("Tỉnh/Thành phố tạm trú").parent().within(function () {
                cy.get("a").first().click()
            })

                .get("label").contains("Huyện/Quận tạm trú").parent().within(function () {
                cy.get("a").click()
            })

                .get("#ui-select-choices-23").find("li").first().click()

                .get("label").contains("Xã/Thị Trấn tạm trú").parent().within(function () {
                cy.get("a").click()
            })

                .get("#ui-select-choices-24").find("li").first().click()

                .get("label").contains("Loại giấy tờ").parent().within(function () {
                cy.get("a").click()
            })

                .get("#ui-select-choices-25").find("li").first().click()

                .get("label").contains("Số").parent().within(function () {
                cy.get("input").focus().type("99999990")
            })

                .get("input[name='identification_issued_date']").focus().type("01/11/2006{enter}")

                .get("input[name='identification_issued_by']").focus().type("HN")

                .get(".general-item-list").within(function () {
                cy.get("label").contains("Họ và tên").parent().within(function () {
                    cy.get("input").focus().type("Nguyen Van B")
                })
            })

                .get("label").contains("Mối quan hệ").parent().within(function () {
                cy.get("a").click()
            })

                .get("#ui-select-choices-26").find("li").first().click()

                .get("button").contains("Lưu").click()

                //check result
                .get('div[ng-switch]')
                .find('.toast-message')
                .should('contain', "Tạo mới thành công")

                .url().should('include', Cypress.env("URL_ADD_NEW_PATIENT"))
        })
    })
})