var delay = 3000;
describe('TC_GUI', function() {
    context('Them moi banh nhan', function(){
        beforeEach(function(){
            // login url
            cy.visit(Cypress.env("URL_LOGIN"))

            // read file users.json and login as doctor
            cy.fixture('users').then(users => {
                cy.login(users.doctor);
              })
            // visit add new patient link
            cy
            .visit(Cypress.env("URL_ADD_NEW_PATIENT"))
            .wait(delay)
            // .pause()
        })
        
    
        it('THEMMOI_BN_105 --> Kiem tra thong tin bat buoc',function(){

            cy.fixture('sample_data').then(patient => {
               
                // cy.get('input[ng-model="patient.admission_date"]')
                // .type(patient.admission_date)
                // nhập thông tin dạng text
                var doTypeList = ["name","birthdate","identification_number","identification_issued_date","identification_issued_by"]
                doTypeList.forEach(input=>{
                    cy.doType("input[ng-model='patient."+input+"']",patient[input])
                })
                //  nhập thông tin dạng select
                var doSelect2List = ['gender','province_id','district_id','ward_id',
                                    'resident_province_id','resident_district_id','identification_type']
                doSelect2List.forEach(input=>{
                    cy.doSelect2("div[ng-model='patient."+input+"']",patient[input])
                })
                // nhập một số thông tin còn lại
                cy.doType('input[ng-model="contact.name"]',patient.contacts[0].name)
                cy.doSelect2('div[ng-model="contact.contact_type"]', patient.contacts[0].contact_type)
                //  submit
                cy.get('button[type="submit"]').first().click()
                .wait(delay)
                //  kiểm tra thông báo lỗi trên màn hình
                cy.get('div[ng-message="required"').should('contain','Trường này không được để trống.')
        })
    })
})
})