describe('Common TC_GUI', function() {
  context('Validate du lieu truong so', function() {
  
    const typeToDosage = function(dosage) {
      return cy.get('input[name="dosage"]').type(dosage + '{enter}')
    }

    const dosageMustBeFocused = function() {
      cy.focused().should('have.attr', 'name', 'dosage')
    }

    const CREATE_PRESCRIPTION_SUCCESS = 'Tạo đơn thuốc thành công'  

    beforeEach(function() {
      cy.visit("/signin")
    
      cy.fixture('users').then(users => {
        cy.doLoginAs(users.doctor)
      })

      // mo modal them don thuoc
      cy.visit('/main/patients')
      cy.get('a[ng-click="showCreatePrescriptionModal()"]')
        .first().click()
      
      // chon don thuoc
      cy.get('div[name="medicine_list_id"]').click()
        .find('tr').last().click()
    
      // dien thoi luong
      cy.get('input[name="duration"]').type('90')
    })

    // dien qua lieu luong cho phep
    it('Common_TC_G_28', function() {
      typeToDosage(1001).parent()
        .should('contain', 'Vui lòng nhập giá trị nhỏ hơn hoặc bằng 1000.')
      dosageMustBeFocused();
    })

    // dien nho hon lieu luong cho phep
    it('Common_TC_G_29', function() {
      typeToDosage(0)
      cy.get('body').should('contain', 'Liều lượng phải lớn hơn 0.')
      dosageMustBeFocused()
    })

    // dien lieu luong nho nhat cho phep
    it('Common_TC_G_30', function() {
      typeToDosage(1)
      cy.get('body').should('contain', CREATE_PRESCRIPTION_SUCCESS)
    })

    // dien lieu luong nam trong khoang cho phep
    it('Common_TC_G_31', function() {
      typeToDosage(50)
      cy.get('body').should('contain', CREATE_PRESCRIPTION_SUCCESS)
    })

    // dien lieu luong lon nhat cho phep
    it('Common_TC_G_32', function() {
      typeToDosage(1000)
      cy.get('body').should('contain', CREATE_PRESCRIPTION_SUCCESS)
    })
  })
})
