var delay = 3000;
describe('TC_GUI', function() {
    context('Them moi banh nhan', function(){
        beforeEach(function(){
            cy
            .visit(Cypress.env("USER_LOGIN"))
            .get('input[name=email]').type(Cypress.env("USER_DOCTOR"))
            .get('input[name=password]').type(Cypress.env("LOGIN_PASSWORD"))
            .type('{enter}')
            .wait(delay)
            .visit(Cypress.env("URL_ADD_NEW_PATIENT"))
            .wait(delay)
            // cy.pause()
        })
    
        it('THEMMOI_BN_102 --> Kiem tra gia tri mac dinh',function(){

            cy.get('.ui-select-container[name=resident_ward_id]')
            .within(function(){
                    cy.get('span').first().should(("contain", '-- Chọn Xã/Thị trấn --'))
                })

            cy.fixture('district_wards').then(each=>{
                cy.get('.ui-select-container[name=resident_district_id]')
                .click()
                .find('li[role="option"]').contains(each.district).first().click()
    
                cy.get('.ui-select-container[name=resident_ward_id]').click().as('selection')
                each.wards.forEach(function(element) {
                    cy.get('@selection').find('li[role="option"]').contains(element)
                }, this);
            })

            

            // .within(function(){
            //     cy.get('span').first().should(("contain", '-- Chọn Xã/Thị trấn --'))
            // })
            // .within(function(){
            //     cy.get('label')
            // })
            // .eq(2)
            
            // cy.get('"select2-choice')
            // cy.fixture('images/bug.png').as("avatar")
            // cy.get('input[type=file]').then(function(el) {
            //      Cypress.Blob.base64StringToBlob(this.avatar, 'image/png')
            //       .then(blob => {
            //         el[0].files[0] = blob
            //         el[0].dispatchEvent(new Event('change', {bubbles: true}))
            //       })
            //   })
            // cy.get("input[type=file]")
            // .then(function(input){
            //     input.fileUpload()
            // })
            // .then(function($input){
                
            //       // convert the logo base64 string to a blob
            //       return Cypress.Blob.base64StringToBlob(this.avatar, "image/png").then(function(blob){
                
            //         // pass the blob to the fileupload jQuery plugin
            //         // used in your application's code
            //         // which initiates a programmatic upload
            //         $input.fileupload("add", {files: blob})
            //       })
            //     })
        })
    })
})