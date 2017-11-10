describe('Kiểm thử tim kiem combo Dan toc', function() {

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

      cy.get('div[ng-model="patient.ethnicity_id"]').first().click()

      /*cy.get('.ui-select-dropdown.select2-drop.select2-with-searchbox.select2-drop-active').within(function() {
        cy.get('input').first().type('ha')
      })*/
            cy.wait(500)
      cy.get('.ui-select-dropdown.select2-drop.select2-with-searchbox.select2-drop-active').last().within(function() {
        cy.get('div input').type('la h{enter}')
      })

      cy.get('div[ng-model="patient.ethnicity_id"] ').first().within(function() {
        cy.get('a span span').should("contain","La Ha")
      })
    })

  })

})