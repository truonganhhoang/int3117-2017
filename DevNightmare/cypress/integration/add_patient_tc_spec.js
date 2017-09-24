describe('Them moi benh nhan', function() {
  beforeEach(function() {
    cy.visit('/signin');

    cy.fixture('users').then(users => {
      cy.doLoginAs(users.doctor);
    })

    cy.visit('/main/patients/new')
  })

  const completeRequiredInformation = function() {
    cy.fixture('sample_patient').then(patient => {

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
    })
  }

  const getPatientInfoPortlet = function() {
    return cy.get('.portlet').eq(1)
  }

  const getPatientListPortlet = function() {
    return cy.get('.portlet').eq(0)
  }

  const submitForm = function() {
    cy.get('button[type="submit"]').click()
  }

  const getAdmissionDateInput = function() {
    return cy.get('input[ng-model="patient.admission_date"]') 
  }
  
  context('Kiem tra truong "Ngay vao dieu tri"', function() {
  
    const addDays = function(date, days) {
      var result = new Date(date)
      result.setDate(date.getDate() + days)
      return result
    }

    const formatDate = function(date) {
      return ('0' + date.getDate()).slice(-2) + '/'
             + ('0' + (date.getMonth()+1)).slice(-2) + '/'
             + date.getFullYear();
    }

    it('THEMMOI_BN_50', function() {
      getPatientInfoPortlet().within(function() {
        getAdmissionDateInput().type('20/10/2005')
          .siblings('span').click()
      })
      cy.get('.datepicker-days').should('contain', 'October 2005')
        .find('td.active').should('contain', '20')
    })

    it('THEMMOI_BN_51', function() {
      getPatientInfoPortlet().within(function() {
        getAdmissionDateInput().siblings('span').click()        
      })

      // use current date
      var date = new Date()
      cy.get('.datepicker-days')
        .find('td.today').should('contain', date.getDate()).click()
 
      getPatientInfoPortlet().within(function() {
        getAdmissionDateInput().should('have.value', formatDate(date))
      })
    })

    it('THEMMOI_BN_52', function() {
      getPatientInfoPortlet().within(function() {
        getAdmissionDateInput().type('5/20/2015')
        
        // {tab} is not supported, use click() instead
        cy.get('input[ng-model="patient.referral_agency"]').click()

        getAdmissionDateInput().closest('.form-group')
          .find('div[ng-messages="form.admission_date.$error"]').should('be.visible')
      }) 
    })

    it('THEMMOI_BN_53', function() {
      getPatientInfoPortlet().within(function() {
        completeRequiredInformation()
        submitForm()
        getAdmissionDateInput().closest('div.form-group')
          .contains('Trường này không được để trống.').should('exist')
      })
    })

    it('THEMMOI_BN_54', function() {
      getPatientInfoPortlet().within(function() {
        completeRequiredInformation()

        // generate wrong admission date
        cy.fixture('sample_patient').then(patient => {
          var raw = patient.birth_date.split('/');
          var birthDate = new Date(raw[2], raw[1] - 1, raw[0])
          getAdmissionDateInput().type(formatDate(addDays(birthDate, -1)))
        })
        submitForm()
      })

      cy.contains('Ngày vào điều trị không được nhỏ hơn ngày sinh').should('be.visible')
    })
  })

  context('Chuc nang', function() {

    it('THEMMOI_BN_165', function() {
      getPatientInfoPortlet().within(function() {
        completeRequiredInformation()
        cy.fixture('sample_patient').then(
          patient => getAdmissionDateInput().type(patient.admission_date))
        submitForm()
      })
      
      // kiem tra thong bao them moi thanh cong
      cy.contains('Tạo mới thành công').should('be.visible')

      // kiem tra xem ban ghi duoc hien thi dau tien trong danh sach
      cy.visit('/main/patients')
      getPatientListPortlet().within(function() {
        cy.fixture('sample_patient').then(
          patient => cy.get('table > tbody > tr').first().should('contain', patient.name))
      })

    })
 
    it('THEMMOI_BN_166', function() {
      // always true
    })
  })
})
