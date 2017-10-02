describe('Kiem tra chuc nang tim kiem tren combo-box',function(){
    it('login',function(){
        cy.visit('/signin')
        cy.get('input[name=email]').type('doctor_10@gmail.com')
        cy.get('input[name=password]').type('Methadone@2017')
        cy.get('button[type=submit]').click()
        cy.pause()
        cy.visit('/main/patients/new')
    })
    it('Chon tinh/thanh pho thuong tru',function(){
        cy
        .get("label.required")
        .contains("Tỉnh/Thành phố thường trú")
        .parent()
        .within(function(){
          cy.root().get(".ui-select-container").click()  
        })
        cy.get('#ui-select-choices-row-19-22').click()
    })
    it('Chon huyen/quan thuong tru',function(){
        cy
        .get("label.required")
        .contains("Huyện/Quận thường trú")
        .parent()
        .within(function(){
          cy.root().get(".ui-select-container").click()  
        })
        cy.get('#ui-select-choices-row-20-4').click()
    })
    it('Chon xa/thi tran thuong tru',function(){
        cy
        .get("label.required")
        .contains("Xã/Thị Trấn thường trú")
        .parent()
        .within(function(){
          cy.get(".ui-select-container").click()
          cy.get("input[type=search]").first().type("Đại ").focus().click()
        })
    })
})
