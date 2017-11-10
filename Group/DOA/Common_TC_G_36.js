describe('Common TC_GUI', function() {
  context('Validate du lieu truong so', function() {
    beforeEach(function() {
      cy
       	.visit('signin')
     
    })

     it('So chu so sau dau phay vuot qua max length (Them moi don thuoc)_taikhoandoctor',function(){
      cy
        .get("input[name='email']").type(Cypress.env('USER_DOCTOR'))
        .get("input[name='password']").type(Cypress.env('LOGIN_PASSWORD'))
        .get("button[type='submit']").click()
        .get("a[href$='/main/patients']").click()
        .wait(5000)
        .get("a[ng-click='showCreatePrescriptionModal()']").click()
        .get("div[ng-model='new_prescription.medicine_list_id']").click()
        .get('.select2-result-label.ui-select-choices-row-inner').eq(1).click()     
        .get("input[ng-model='new_prescription.dosage']").type("111.1111111111111111111111111111111111")
        .get("input[ng-model='new_prescription.duration']").type("111.111111111111111111111111111")
        .get('[ng-submit="newPrescriptionForm.$valid && createPrescription()"] [type="submit"]').click();
        //tu dong khong cho phep nhap vuot qua max length
                
    })

     it('So chu so sau dau phay vuot qua max length (them moi don thuoc)_taikhoanadmin', function(){
      cy
      .get("input[name='email']").type(Cypress.env('USER_AGENCY'))
      .get("input[name='password']").type(Cypress.env('LOGIN_PASSWORD'))
      .get("button[type='submit']").click()
      .get("a[href$='/main/patients']").click()
      .wait(5000)
      .get('a[ng-click="showCreatePrescriptionModal()"]').click()
      .get("div[ng-model='new_prescription.medicine_list_id']").click()
      .get('.select2-result-label.ui-select-choices-row-inner').eq(1).click()     
      .get("input[ng-model='new_prescription.dosage']").type("111.1111111111111111111111111111111111111111111")
      .get("input[ng-model='new_prescription.duration']").type("111.111111111111111111111111111111")
      .get('[ng-submit="newPrescriptionForm.$valid && createPrescription()"] [type="submit"]').click();
      //tu dong khong cho nhap vuot qua max length

  })
  })
}) 
