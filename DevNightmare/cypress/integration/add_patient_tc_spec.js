describe('Them moi benh nhan', function() {
  context('Kiem tra truong "Ngay vao dieu tri"', function() {

    beforeEach(function() {
      cy.visit('/signin');

      cy.fixture('users').then(users => {
        cy.doLoginAs(users.doctor);
      })

      cy.visit('/main/patients/new')

      cy.fixture('sample_patient').then(patient => {
        cy.get('.portlet').last().within(function() {
          cy.get('input[ng-model="patient.name"]').type(patient.name)
          cy.get('input[ng-model="patient.birthdate"]').type(patient.birth_date)
//          cy.get('div[ng-model="patient.gender"]').select(patient.gender)

        })
      })
    })

    it('THEMMOI_BN_50', function() {
      
    })
  })
})
