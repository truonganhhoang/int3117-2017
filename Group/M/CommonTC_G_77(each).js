describe('Kiểm tra khi trường ngày tháng không đúng định dạng', function() {
    
      context('CommonTC_G_77(?)', function(){
        beforeEach(function(){
            cy.visit("signin")
            cy.get('input[name=email]').type('doctor_10@gmail.com')
            cy.get('input[name=password]').type('Methadone@2017{enter}')
            cy.wait(3000)
            cy.visit("main/patients/new")
        })
    
        it('Nhập ngày tháng với định dạng MM/DD/YYYY', function(){
            cy.get("input[datepicker]").each(function($el, index, $list){
                cy.wrap($el).focus().type("10/20/1997")
                cy.wrap($el).parent().parent().within(function(){
                    cy.get(".text-error").should("contain","Ngày tháng không đúng định dạng")
                })
            })
        })
    })
})