describe('My First Test ahjhj', function() {
    context('Form login', function(){
        
    beforeEach(function(){
        cy.visit('/wp-admin')
        cy.get('#user_login').type('duyenhh').then(function(){
            cy.get('#user_pass').type('1234567{enter}')
        })
    
        cy.visit('wp-admin/post-new.php')
    })

    it('Khong dien email',function(){
        
        // cy.get('#wpwrap')
        cy.get('#insert-media-button').click()
        cy.get('.media-router > .media-menu-item').first().click()
        cy.get('#__wp-uploader-id-1').click()

        // cy.get('#login_error')
        // .get('strong')
        // .should('contain','ERROR')
        // cy.get('#wp-submit').then(($submit)=>{
    
        //     $submit.click()
        // })
    })
})
  })