describe('Common TC_GUI', function() {
  context('Validate du lieu truong so', function() {
    beforeEach(function() {
      cy
       	.visit('signin')
    })
    it('Nhap ki tu chu(sua thong tin benh nhan)_taikhoanbacsi', function(){
      cy.get("input[name='email']").type(Cypress.env('USER_DOCTOR'))
      cy.get("input[name='password']").type(Cypress.env('LOGIN_PASSWORD'))
      cy.get("button[type='submit']").click()
      cy.get("a[href$='/main/patients']").click()
      cy.wait(2000)
      cy.get("a[ng-click='check_change_agency(patient)']").first().click()
      cy.get("input[name='mobile_phone']").clear()
      cy.get("input[name='mobile_phone']").type("falfkjdla")
	   	cy.get("[ng-submit='form.$valid && updatePatient()'] [ng-model='patient.identification_number']").clear()
      cy.get("[ng-submit='form.$valid && updatePatient()'] [ng-model='patient.identification_number']").type("dafdafdf")
      cy.get('[ng-submit="form.$valid && updatePatient()"] [type="submit"]').click();
	   	cy.contains("SĐT không đúng định dạng")
	   	// da focus vao phan tu co thuoc tinh nam=mobile_phone
	    cy.focused().should('have.attr', 'name', 'mobile_phone')
    })

    it('Nhap ki tu chu(Them moi don thuoc)_taikhoanbacsi',function(){
      cy
        .get("input[name='email']").type(Cypress.env('USER_DOCTOR'))
        .get("input[name='password']").type(Cypress.env('LOGIN_PASSWORD'))
        .get("button[type='submit']").click()
        .get("a[href$='/main/patients']").click()
        .wait(5000)
        .get('a[ng-click="showCreatePrescriptionModal()"]').click()
        .get("div[ng-model='new_prescription.medicine_list_id']").click()
        .get('.select2-result-label.ui-select-choices-row-inner').eq(1).click()     
        .get("input[ng-model='new_prescription.dosage']").type("dsafasdf")
        .get("input[ng-model='new_prescription.duration']").type("abcddd")
        .get('[ng-submit="newPrescriptionForm.$valid && createPrescription()"] [type="submit"]').click()
        //khong cho nhap
        .get("input[ng-model='new_prescription.dosage']").should('be.empty')
        .get("input[ng-model='new_prescription.duration']").should('be.empty')
        
    })

    it('Nhap ki tu chu(sua thong tin benh nhan)_taikhoanadmin', function(){
      cy.get("input[name='email']").type(Cypress.env('USER_AGENCY'))
      cy.get("input[name='password']").type(Cypress.env('LOGIN_PASSWORD'))
      cy.get("button[type='submit']").click()
      cy.get("a[href$='/main/patients']").click()
      cy.wait(2000)
      cy.get("a[ng-click='check_change_agency(patient)']").first().click()
      cy.get("input[name='mobile_phone']").clear()
      cy.get("input[name='mobile_phone']").type("falfkjdla")
      cy.get("[ng-submit='form.$valid && updatePatient()'] [ng-model='patient.identification_number']").clear()
      cy.get("[ng-submit='form.$valid && updatePatient()'] [ng-model='patient.identification_number']").type("dafdafdf")
      cy.get('[ng-submit="form.$valid && updatePatient()"] [type="submit"]').click();
      cy.contains("SĐT không đúng định dạng")
      // da focus vao phan tu co thuoc tinh nam=mobile_phone
      cy.focused().should('have.attr', 'name', 'mobile_phone')
    })


    it('Nhap ki tu chu(them moi don thuoc)_taikhoanadmin', function(){
      cy
      .get("input[name='email']").type(Cypress.env('USER_AGENCY'))
      .get("input[name='password']").type(Cypress.env('LOGIN_PASSWORD'))
      .get("button[type='submit']").click()
      .get("a[href$='/main/patients']").click()
      .wait(5000)
      .get('a[ng-click="showCreatePrescriptionModal()"]').click()
      .get("div[ng-model='new_prescription.medicine_list_id']").click()
      .get('.select2-result-label.ui-select-choices-row-inner').eq(1).click()     
      .get("input[ng-model='new_prescription.dosage']").type("dsafasdf")
      .get("input[ng-model='new_prescription.duration']").type("abcddd")
      .get('[ng-submit="newPrescriptionForm.$valid && createPrescription()"] [type="submit"]').click()
        //khong cho nhap
      .get("input[ng-model='new_prescription.dosage']").should('be.empty')
      .get("input[ng-model='new_prescription.duration']").should('be.empty')
    })

    it('Nhap ki tu chu(them moi benh nhan)_taikhoanbacsi', function(){
        cy.get("input[name='email']").type(Cypress.env('USER_DOCTOR'))
        cy.get("input[name='password']").type(Cypress.env('LOGIN_PASSWORD'))
        cy.get("button[type='submit']").click()
        // cy.wait(5000)
        cy.get("a[href$='/main/patients']").click()
        cy.get("a[href$='/main/patients/new']").click()
        cy.get("input[autofocus='']").type("Nguyenjt Van T")
        cy.get("input[name='birth_date']").type("20/12/1999")
        cy.get("div[name='gender']").click()
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(1).click();
        cy.get("input[name='mobile_phone']").type("sdfgsdfg")
        cy.get("input[name='admission_date']").type("20/08/2017")
        cy.get("[ng-submit='form.$valid && createPatient()'] [ng-model='patient.province_id']").click()
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click()

        cy.get("[ng-submit='form.$valid && createPatient()'] [ng-model='patient.district_id']").click()
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click()

        cy.get("[ng-submit='form.$valid && createPatient()'] [name='district_id']").click()
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click()

        cy.get("[ng-submit='form.$valid && createPatient()'] [name='ward_id']").click()
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click()

        cy.get("[ng-submit='form.$valid && createPatient()'] [name='resident_province_id']").click()
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click()

        cy.get("[ng-submit='form.$valid && createPatient()'] [name='resident_district_id']").click()
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click()
        cy.get("[ng-submit='form.$valid && createPatient()'] [name='resident_ward_id']").click()
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click()
        cy.get("[ng-submit='form.$valid && createPatient()'] [name='identification_type']").click()
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click()
        cy.get("[ng-submit='form.$valid && createPatient()'] [ng-model='patient.identification_number']").type("fdasdsaf")
        cy.get("[ng-submit='form.$valid && createPatient()'] [name='identification_issued_date']").type("10/10/2010")
        cy.get("[ng-submit='form.$valid && createPatient()'] [name='identification_issued_by']").type("Hải Đông")
        cy.get("[ng-submit='form.$valid && createPatient()'] [ng-model='contact.name']").type("ldgfasdfd")
        cy.get("[ng-submit='form.$valid && createPatient()'] [name='contact_type']").click()
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click()
        cy.get('[ng-submit="form.$valid && createPatient()"] [type="submit"]').click();
        cy.contains("SĐT không đúng định dạng.")
        cy.focused().should('have.attr', 'name', 'mobile_phone')
      })
  })
}) 
