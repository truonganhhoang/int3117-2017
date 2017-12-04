const delay = 500
describe('Tim kiem tren combo box "Nghê nghiệp"', function() {
      
      it('Đăng nhập với tư cách trưởng cơ sở và vào trang "Thêm mới"', function(){
            cy.visit('/signin')
            cy.get('input[name=email]').type('admin_agency_10@gmail.com')
            cy.get('input[name=password]').type('Methadone@2017')
            cy.get('button[type=submit]').click()
            cy.url().should('include', '/main/dashboard1')
            cy.wait(delay)        
            cy.visit('/main/patients/860/detail/executive_info')
            cy.wait(delay) 
            cy.visit('/main/patients/new')            
      })

      it('Click combo box "Nghề nghiệp" va thuc hien tim kiem', function(){ 
      	    cy.wait(2000) 
            cy.get('div[ng-model="patient.jobs"]').first().click()
            // cy.get('input.ui-select-search.select2-input.ng-valid.ng-touched.ng-not-empty.ng-dirty.ng-valid-parse').type('Công nhân')
            cy.get('div[ng-model="patient.jobs"] > div > div').first().type('Công nhân')
            
      })
})

