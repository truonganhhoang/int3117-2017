describe('Kiểm tra textbox "Thôn/Ấp thường chú"', function() {
  beforeEach(function(){
    cy.visit('signin')
  })

  var randomNum = getRandomInt(1, 9999)
  var patientName = "Pham Van A " + randomNum
  var contactName = "Pham Van B " + randomNum
  var identificationNumber = "031069001696" + randomNum
  var patientData = [
    {name: "name",                       value: patientName},
    {name: "birthdate",                  value: "10/03/1996"},
    {name: "admission_date",             value: "10/03/2016"},
    {name: "identification_number",      value: identificationNumber},
    {name: "identification_issued_date", value: "10/03/2015"},
    {name: "identification_issued_by",   value: "Ha Noi"},
    {name: "hamlet",                     value: "%^&*()"}
  ]
  var selectPatientData = [
    {name: "gender"},
    {name: "ward_id"},
    {name: "resident_ward_id"},
    {name: "resident_ward_id"},
    {name: "identification_type"}
  ]
  var contactData = [
    {name: "name", value: contactName},
  ]
  var selectContactData = [
    {name: "contact_type"}
  ]

  it("Kiểm tra khi nhập các giá trị đặc biệt", function() {
    //Login
    cy.get('input[name=email]').type(Cypress.env('USER_AGENCY'))
    cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'))
    cy.get('button[type=submit]').click()
    cy.url().should('include','main/dashboard1')
    cy.wait(500)

    // Redirect to patient manager
    cy.contains('Quản lý bệnh nhân').click()
    cy.wait(500)

    // Click button Sua
    cy.contains('Thêm').click()
    cy.wait(500);
    cy.get('form.ng-scope.ng-invalid-required.ng-valid-pattern.ng-pending.ng-dirty.ng-valid-parse').within(function(){
      for(let i=0; i < patientData.length; i++){
        let inputField = patientData[i]
        let fieldGet = '[ng-model="patient.' + inputField['name'] + '"]'
        cy.get(fieldGet).clear({force: true}).type(inputField['value'])
      }
      for(let i = 0 ; i < selectPatientData.length; i++){
        let inputField = selectPatientData[i]
        let fieldGet = '[ng-model="patient.' + inputField['name'] + '"]'
        cy.get(fieldGet).within(function(){
          cy.contains('--').click()
          if(fieldGet == 'ng-model="patient.gender"'){
            cy.get('ul li:first').click()
          }else{
            cy.get('ul li ul li:first').click()
          }
        })
      }
      for(let i = 0 ; i < contactData.length ; i++){
        let inputField = contactData[i]
        let fieldGet = '[ng-model="contact.' + inputField['name'] + '"]'
        cy.get(fieldGet).clear({force: true}).type(inputField['value'])
      }
      for(let i = 0 ; i < selectContactData.length; i++){
        let inputField = selectContactData[i]
        let fieldGet = '[ng-model="contact.' + inputField['name'] + '"]'
        cy.get(fieldGet).within(function(){
          cy.contains('--').click()
          cy.get('ul li ul li:first').click()
        })
      }
    })

    cy.contains('Lưu').click()
    cy.get('div').should('contain', 'Tạo mới thành công')
    cy.wait(500)
    //Kiem tra hien thi
    cy.contains('Thông tin chi tiết').click()
  })
})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
