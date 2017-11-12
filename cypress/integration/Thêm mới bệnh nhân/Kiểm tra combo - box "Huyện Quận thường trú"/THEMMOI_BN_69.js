describe("Thêm mới benh nhan", function(){
    beforeEach(function(){
        cy
            .visit('/')
            .get("input[name='email']").type("admin_agency_10@gmail.com")
            .get("input[name='password']").type("Methadone@2017{enter}")
            .visit('/main/patients/new')
    })

    it('THEMMOI_BN_69_Kiem_tra_can_le', function(){
        cy.get("label.required").contains("Huyện/Quận thường trú").parent().within(function(){
            cy.root().get(".ui-select-container").click()
                    .get('.select2-results').should('not.have.css', 'text-align')
        })
    })
})
