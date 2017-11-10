const delay = 200
describe('Kiểm tra căn lề trái combo box', function() {
    it('Đăng nhập va kiem tra', function () {
        cy.visit('/signin')
        cy.get('input[name=email]').type('doctor_10@gmail.com')
        cy.get('input[name=password]').type('Methadone@2017')
        cy.get('button[type=submit]').click()
        cy.url().should('include', '/main/doctor/dashboard')
        cy.wait(delay)        
        cy.visit('/main/patients/new')
        cy.wait(delay) 
        cy.get('div[ng-model="patient.jobs"]').first().click()
        cy.wait(delay) 
        cy.get('div[class="select2-result-label ui-select-choices-row-inner"]').first().and('have.css', 'text-align')
        .and('match', /left/) 
    })
})

