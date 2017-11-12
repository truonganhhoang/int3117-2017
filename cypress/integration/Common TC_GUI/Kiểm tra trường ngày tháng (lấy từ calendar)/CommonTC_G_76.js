describe('Kiểm tra trường ngày tháng là bắt buộc nhập', function() {
    
      context('CommonTC_G_76', function(){
        beforeEach(function(){
            cy.visit("signin")
                cy.get('input[name=email]').type('doctor_10@gmail.com')
                cy.get('input[name=password]').type('Methadone@2017{enter}')
                cy.wait(3000)
                cy.visit("main/patients/new")
        })
    
        it('Không chọn giá trị nào cho trường ngày tháng', function(){
            cy.get("button").contains("Lưu").click();
            cy.get("input[datepicker]").parent().parent().within(function(){
                cy.get(".text-error").should("contain","Trường này không được để trống")
            })
        })
    })
})