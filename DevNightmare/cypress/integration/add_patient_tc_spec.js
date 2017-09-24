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
/*
          // ho va ten
          cy.get('input[ng-model="patient.name"]').type(patient.name)

          // ngay sinh
          cy.get('input[ng-model="patient.birthdate"]').type(patient.birth_date)

          // gioi tinh
          cy.doSelect2('div[ng-model="patient.gender"]', patient.gender)

          // tinh thuong tru
          cy.doSelect2('div[ng-model="patient.province_id"]', patient.province_id)

          // huyen thuong tru
          cy.doSelect2('div[ng-model="patient.district_id"]', patient.district_id)

          // xa thuong tru
          cy.doSelect2('div[ng-model="patient.ward_id"]', patient.ward_id)

          // tinh tam tru
          cy.doSelect2('div[ng-model="patient.resident_province_id"]', patient.resident_province_id)

          // huyen tam tru
          cy.doSelect2('div[ng-model="patient.resident_district_id"]', patient.resident_district_id)

          // xa tam tru
          cy.doSelect2('div[ng-model="patient.resident_ward_id"]', patient.resident_ward_id)

          // dien cmnd
          cy.doSelect2('div[ng-model="patient.identification_type"]', patient.identification_type)
          cy.get('input[ng-model="patient.identification_number"]').type(patient.identification_number)
          cy.get('input[ng-model="patient.identification_issued_date"]').type(patient.identification_issued_date)
          cy.get('input[ng-model="patient.identification_issued_by"]').type(patient.identification_issued_by)

          // nguoi than
          cy.get('input[ng-model="contact.name"]').type(patient.contacts[0].name)
          cy.doSelect2('div[ng-model="contact.contact_type"]', patient.contacts[0].contact_type)
*/
        })
      })
    })

    const getPatientInfoPortlet = function() {
      return cy.get('.portlet').eq(1)
    }

    it('THEMMOI_BN_50', function() {
      getPatientInfoPortlet().within(function() {
        cy.get('input[ng-model="patient.admission_date"]').type('20/10/2005')
          .siblings('span').click()
      })
      cy.get('.datepicker-days').should('contain', 'October 2005')
        .find('td.active').should('contain', '20')
    })

    it('THEMMOI_BN_52', function() {
                                                                                                              
    })
  })
})
