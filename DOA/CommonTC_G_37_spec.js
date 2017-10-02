describe('Common TC_GUI', function() {
  context('Validate du lieu truong so', function() {
    beforeEach(function() {
      cy
      .visit('13.76.80.144/signin')
      .get("input[name='email']").type("doctor_10@gmail.com")
      .get("input[name='password']").type("Methadone@2017{enter}")

      cy.get("a[href$='/main/patients']").click()
      cy.get('a[ng-click="showCreatePrescriptionModal()"]').first().click()
      
      cy.get("div[ng-model='new_prescription.medicine_list_id']").click()
      cy.get('.select2-result-label.ui-select-choices-row-inner').eq(1).click()      
     
    })
     it('CommonTC_G_37', function(){
      cy.get("input[ng-model='new_prescription.dosage']").type(10)
      cy.get("input[ng-model='new_prescription.duration']").type(10.87877)
      cy.get('[ng-submit="newPrescriptionForm.$valid && createPrescription()"] [type="submit"]').click();
      cy.get("input[ng-model='new_prescription.duration']").focus()
    })
  })
})