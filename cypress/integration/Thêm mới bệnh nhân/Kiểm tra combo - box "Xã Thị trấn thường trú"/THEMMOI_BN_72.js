describe('Kiem tra gia tri mac dinh',function(){
  it('login',function(){
    cy.visit(Cypress.env("signin"))
    cy.get('input[name=email]').type('doctor_10@gmail.com')
    cy.get('input[name=password]').type('Methadone@2017')
    cy.get('button[type=submit]').click()
    cy.pause()
    cy.visit(Cypress.env("new"))
  })
  it('Gia tri mac dinh cua xa/thi tran thuong tru',function(){
    cy
    .get("label.required")
    .contains("Xã/Thị Trấn thường trú")
    .parent()
    .within(function(){
      cy.root().get(".select2-choice").should('contain','--Vui lòng chọn--')
    })
  })
  it("Chon tinh,huyen,xa", function(){
    cy
    .get("label.required")
    .contains("Tỉnh/Thành phố thường trú")
    .parent()
    .within(function(){
      cy.root().get(".ui-select-container").click()  
    })
    // Chon thanh pho Ha Noi
    cy
      .get("#ui-select-choices-row-19-22")
      .click()
    cy
    .get("label.required")
    .contains("Huyện/Quận thường trú")
    .parent()
    .within(function(){
      cy.root().get(".ui-select-container").click()  
    })
    // Chon quan/huyen Chuong My 
    cy
        .get("#ui-select-choices-row-20-4")
        .click()
    //Mo xa/thi tran thuong tru    
    cy
    .get("label.required")
    .contains("Xã/Thị Trấn thường trú")
    .parent()
    .within(function(){
      cy.root().get(".ui-select-container").click()  
    })
  })
})