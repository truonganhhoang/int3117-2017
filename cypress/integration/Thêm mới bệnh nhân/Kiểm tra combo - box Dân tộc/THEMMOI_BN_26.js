describe('Kiểm thử luu combo Dan toc', function() {

  context('login', function(){
    beforeEach(function(){
      cy.visit('/main/patients/new')
    })

     it('Dang nhap + Them moi', function(){
      cy.get('input[name=email]').type('doctor_10@gmail.com')
      cy.get('input[name=password]').type('Methadone@2017{enter}')

      cy.url().should('include', '/main/doctor/dashboard')
      cy.wait(3000)
      cy.visit('/main/patients/new')
    	cy.wait(3000)
     
      cy.get("input[name]").first().focus().type("phuongz phung")
      cy.get("input[datepicker]").first().focus().type("08/06/1995")
      cy.get("div[name = gender]").first().click()
      cy.wait(200)
      cy.get(".select2-result-label.ui-select-choices-row-inner").first().click()
      cy.get("input[name=mobile_phone]").type("0975965023")
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

      cy.get('input[ng-model="patient.admission_date"]').focus().type("08/07/2017")
      cy.get('input[ng-model="patient.referral_agency"]').focus().type("Vinh Phuc")
      cy.get('input[ng-model="patient.hamlet"]').focus().type("Vinh Phuc")
      cy.get('input[ng-model="patient.address"]').focus().type("Vinh Phuc")
      cy.get('input[ng-model="patient.resident_hamlet"]').focus().type("Vinh Phuc")
      cy.get('input[ng-model="patient.resident_address"]').focus().type("Vinh Phuc")
      cy.get('input[ng-model="patient.identification_number"]').first().focus().type("123950778")
      cy.get('input[ng-model="patient.identification_issued_by"]').focus().type("Vinh Phuc")
      cy.get('input[ng-model="contact.name"]').focus().type("Vinh Phuc")
      cy.get('input[ng-model="contact.address"]').focus().type("Vinh Phuc")
      cy.get('input[ng-model="contact.telephone"]').focus().type("098446384")


      
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
      
      cy.contains('Tạo mới thành công').should('be.visible')
     

    })

  })

})