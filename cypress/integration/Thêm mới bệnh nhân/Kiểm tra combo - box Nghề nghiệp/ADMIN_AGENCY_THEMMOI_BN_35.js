const delay = 200
describe('Kiểm tra căn lề trái combo box', function() {
    it('Đăng nhập va kiem tra', function () {
        cy.visit('/signin')
        cy.get('input[name=email]').type('admin_agency_10@gmail.com')
        cy.get('input[name=password]').type('Methadone@2017')
        cy.get('button[type=submit]').click()
        cy.url().should('include', '/main/dashboard1')
        cy.wait(delay)        
        cy.visit('/main/patients/860/detail/executive_info')
        cy.wait(delay) 
        cy.visit('/main/patients/new')
        cy.get('div[ng-model="patient.jobs"]').first().click()
        cy.wait(delay) 
        cy.get('div[class="ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active select2-display-none"]').first().should('have.css','text-align','start');
    })
})

