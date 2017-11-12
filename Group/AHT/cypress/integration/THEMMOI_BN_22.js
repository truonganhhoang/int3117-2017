describe('Kiểm tra thông tin bắt buộc', function() {
    // Đăng nhập và chuyển tới trang thêm bệnh nhân
    beforeEach(function(){
        cy.visit('signin')
    })
    it("Đăng nhập bằn tài khoản admin", function(){
        cy.get('input[name=email]').type(Cypress.env('USER_AGENCY'));
        cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'));
        cy.get('button[type=submit]').click()
        cy.url().should('include','main/dashboard1')

        //click quản lý bệnh nhân
        cy.contains('Quản lý bệnh nhân').click()
        cy.wait(1000)
        //click thêm
        cy.get('.inputs a').should('have.attr', 'href', '/main/patients/new').click();
        cy.wait(1000)

        //thêm thông tin đầy đủ vào các trường
        cy.get("input[name]").first().focus().type("con meo")
        cy.get("input[datepicker]").first().focus().type("17/12/1996")
        cy.get('[ng-model="patient.ethnicity_id"]').first().click()
        cy.wait(200)
        cy.get(".select2-result-label.ui-select-choices-row-inner").first().click()
        cy.get("input[name=mobile_phone]").type("0123456789")
        cy.get('div[ng-model="patient.jobs"]').first().click()
        cy.wait(200)
        cy.get(".select2-result-label.ui-select-choices-row-inner").first().click()
        cy.get('div[ng-model="patient.marital_status"]').first().click()
        cy.wait(200)
        cy.get(".select2-result-label.ui-select-choices-row-inner").first().click()
        cy.get('div[ng-model="patient.education_level"]').first().click()
        cy.wait(200)
        cy.get(".select2-result-label.ui-select-choices-row-inner").first().click()
        cy.get('div[ng-model="patient.financial_status"]').first().click()
        cy.wait(200)
        cy.get(".select2-result-label.ui-select-choices-row-inner").first().click()
        cy.get('input[ng-model="patient.admission_date"]').focus().type("17/12/2006")
        cy.get('input[ng-model="patient.referral_agency"]').focus().type("ca mau")
        cy.get('input[ng-model="patient.hamlet"]').focus().type("ca mau")
        cy.get('input[ng-model="patient.address"]').focus().type("ca mau")
        cy.get('input[ng-model="patient.resident_hamlet"]').focus().type("ca mau")
        cy.get('input[ng-model="patient.resident_address"]').focus().type("ca mau")
        cy.get('input[ng-model="patient.identification_number"]').first().focus().type("0123456788")
        cy.get('input[ng-model="patient.identification_issued_by"]').focus().type("ca mau")
        cy.get('input[ng-model="contact.name"]').focus().type("ca mau")
        cy.get('input[ng-model="contact.address"]').focus().type("ca mau")
        cy.get('input[ng-model="contact.telephone"]').focus().type("0123456789")



        cy.get('div[ng-model="contact.contact_type"]').first().click()
        cy.wait(200)
        cy.get(".select2-result-label.ui-select-choices-row-inner").first().click()

        cy.get('div[ng-model="patient.identification_type"]').first().click()
        cy.wait(200)
        cy.get(".select2-result-label.ui-select-choices-row-inner").first().click()

        cy.get('div[ng-model="patient.resident_province_id"]').first().click()
        cy.wait(200)
        cy.get(".select2-result-label.ui-select-choices-row-inner").first().click()

        cy.get('div[ng-model="patient.resident_district_id"]').first().click()
        cy.wait(200)
        cy.get(".select2-result-label.ui-select-choices-row-inner").first().click()

        cy.get('div[ng-model="patient.resident_ward_id"]').first().click()
        cy.wait(200)
        cy.get(".select2-result-label.ui-select-choices-row-inner").first().click()

        cy.get('div[ng-model="patient.ward_id"]').first().click()
        cy.wait(200)
        cy.get(".select2-result-label.ui-select-choices-row-inner").first().click()

        cy.get('input[ng-model="patient.identification_issued_date"]').focus().type("08/07/2012")

        cy.get('.portlet-title.tabbable-line').within(function() {
        cy.get('button[type="submit"]').click()
        })

        cy.contains('Trường này không được để trống.').should('be.visible')
    })
})
