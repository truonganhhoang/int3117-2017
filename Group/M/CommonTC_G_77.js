describe('Kiểm tra khi trường ngày tháng không đúng định dạng', function() {
    
      context('CommonTC_G_77', function(){
        beforeEach(function(){
            cy.visit("signin")
            cy.get('input[name=email]').type('doctor_10@gmail.com')
            cy.get('input[name=password]').type('Methadone@2017{enter}')
            cy.wait(3000)
            cy.visit("main/patients/new")
        })
    
        it('Nhập ngày tháng với định dạng MM/DD/YYYY', function(){
            cy.get("input[datepicker]").first().focus().type("10/20/1997")
            cy.get("input[datepicker]").first().parent().parent().within(function(){
                cy.get(".text-error").should("contain","Ngày tháng không đúng định dạng")
            })
        })

        it('Nhập ngày tháng với định dạng YYYY/DD/MM', function(){
            cy.get("input[datepicker]").first().focus().type("1997/16/10")
            cy.get("input[datepicker]").first().parent().parent().within(function(){
                cy.get(".text-error").should("contain","Ngày tháng không đúng định dạng")
            })
        })

        it('Nhập ngày tháng với định dạng chữ', function(){
            cy.get("input[datepicker]").first().focus().type("abcdefgh")
            cy.get("input[datepicker]").first().parent().parent().within(function(){
                cy.get(".text-error").should("contain","Ngày tháng không đúng định dạng")
            })
        })

        it('Nhập ngày tháng với định dạng DD', function(){
            cy.get("input[datepicker]").first().focus().type("30")
            cy.get("input[datepicker]").first().parent().parent().within(function(){
                cy.get(".text-error").should("contain","Ngày tháng không đúng định dạng")
            })
        })

        it('Nhập ngày tháng với định dạng DD/MM', function(){
            cy.get("input[datepicker]").first().focus().type("30/10")
            cy.get("input[datepicker]").first().parent().parent().within(function(){
                cy.get(".text-error").should("contain","Ngày tháng không đúng định dạng")
            })
        })

    })
})