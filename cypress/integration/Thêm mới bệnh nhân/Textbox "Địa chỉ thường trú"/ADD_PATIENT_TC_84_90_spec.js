describe('Them moi benh nhan', function() {
  beforeEach(function() {
    cy.visit('/signin')

    cy.fixture('users').then(users => {
      cy.doLoginAs(users.doctor)
    })

    cy.visit('/main/patients/new')
  })
  
  const getPatientInfoPortlet = function() {
    return cy.get('.portlet').eq(1)
  }
  //ham hoan thanh cac truong bat buoc
  const completeRequiredInfo = function() {
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

      /* dien thong tin cmnd
       * Identification type 
       * Number
       * Issued date
       * Issued agency
       */
      cy.doSelect2('div[ng-model="patient.identification_type"]', patient.identification_type)
      cy.get('input[ng-model="patient.identification_number"]').type(patient.identification_number)
      cy.get('input[ng-model="patient.identification_issued_date"]').type(patient.identification_issued_date)
      cy.get('input[ng-model="patient.identification_issued_by"]').type(patient.identification_issued_by)
	  
      // dien thong tin nguoi than
      cy.get('input[ng-model="contact.name"]').type(patient.contacts[0].name)
      cy.doSelect2('div[ng-model="contact.contact_type"]', patient.contacts[0].contact_type)
    })
  }
  
  const submit = function() {
    cy.get('button[type="submit"]').click()
  }
  
  //ham nhap gia tri vao truong dia chi thuong tru
  const typePatientAddress = function(value){
	  cy.get('input[ng-model="patient.address"]')
	    .type(value)
  }
  
  context('Kiem tra truong "Địa chỉ thường trú"', function() {

	afterEach(function(){
		cy.visit('/signin');
	    cy.fixture('users').then(users => {
	      cy.doLoginAs(users.agency);
	    })
	    cy.visit('/main/patients')
	    cy.get('.fa-trash-o').click()
	    cy.get('.btn-primary')
	      .contains('Đồng ý').click()
	})
	
	
    it('THEMMOI_BN_84_kiem tra gia trị mac dinh la rong', function() {
        cy.get('input[ng-model="patient.address"]')
          .should('be.empty')  
      })
      
    it('THEMMOI_BN_85_kiem tra la truong khong bat buoc', function(){
    	completeRequiredInfo()
    	submit()
    	cy.contains('Tạo mới thành công').should('be.visible')
    })
    
    it('THEMMOI_BN_86_kiem tra nhap gia tri dac biet', function(){
    	completeRequiredInfo()
    	typePatientAddress('&^$%#$##')
    	submit()
    	cy.contains('Tạo mới thành công').should('be.visible')
    	//kiem tra du lieu hien thi khong bi loi font
    	cy.get('.fa-pencil-square-o').click()
    	cy.get('input[ng-model="patient.address"]')
    	  .should('contain','&^$%#$##')
    })
    
    it('THEMMOI_BN_87_kiem tra nhap qua max length', function(){
    	//chua co thong tin max length
    })
    
    it('THEMMOI_BN_88_kiem tra nhap du lieu HTML', function(){
    	completeRequiredInfo()
    	typePatientAddress('<p>This is some text</p>')
    	submit()
    	cy.contains('Tạo mới thành công').should('be.visible')
    	//kiem tra du lieu khong bi ma hoa khi view len
    	cy.get('.fa-pencil-square-o').click()
    	cy.get('input[ng-model="patient.address"]')
    	  .should('contain','this is some text')
    })
        
    it('THEMMOI_BN_89_kiem tra chuc nang Trim space', function(){
    	completeRequiredInfo()
    	typePatientAddress(' strim space ')
    	submit()
    	cy.contains('Tạo mới thành công').should('be.visible')
    	//kiem tra du lieu da duoc trim space
    	cy.get('.fa-pencil-square-o').click()
    	cy.get('input[ng-model="patient.address"]')
    	  .should('contain','strim space')
      })
    
    it('THEMMOI_BN_90_kiem tra nhap tieng viet co dau', function(){
    	completeRequiredInfo()
    	typePatientAddress('tiếng việt có dấu')
    	submit()
    	cy.contains('Tạo mới thành công').should('be.visible')
    	//kiem tra hie thi du lieu binh thuong khong bi loi font
    	cy.get('.fa-pencil-square-o').click()
    	cy.get('input[ng-model="patient.address"]')
    	  .should('contain','tiếng việt có dấu')
    })
 
  })
})
