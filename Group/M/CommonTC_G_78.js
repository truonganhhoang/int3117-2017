describe('Kiểm tra khi trường ngày tháng có định dạng DD/MM/YYYY nhưng không hợp lệ', function() {
    
      context('CommonTC_G_78', function(){
        beforeEach(function(){
            cy.visit("signin")
            cy.get('input[name=email]').type('doctor_10@gmail.com')
            cy.get('input[name=password]').type('Methadone@2017{enter}')
            cy.wait(3000)
            cy.visit("main/patients/new")
        })
    
        it('Nhập ngày tháng với ngày DD ngoài khoảng [01,31]; ví dụ: 32/04/2009', function(){
            cy.get("input[datepicker]").first().focus().type("32/04/2009")
            cy.get("input[datepicker]").first().parent().parent().within(function(){
                cy.get(".text-error").should("contain","Ngày tháng không tồn tại")
            })
        })

        it('Nhập ngày tháng với tháng MM ngoài khoảng [01,12]; ví dụ: 32/04/2009', function(){
            cy.get("input[datepicker]").first().focus().type("12/14/2009")
            cy.get("input[datepicker]").first().parent().parent().within(function(){
                cy.get(".text-error").should("contain","Ngày tháng không tồn tại")
            })
        })

        describe('Kiểm tra với các giá trị biên', function(){
            it('Nhập 31/04/1983', function(){
                cy.get("input[datepicker]").first().focus().type("31/04/1983")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("contain","Ngày tháng không tồn tại")
                })
            })

            it('Nhập 31/06/1983', function(){
                cy.get("input[datepicker]").first().focus().type("31/06/1983")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("contain","Ngày tháng không tồn tại")
                })
            })

            it('Nhập 31/09/1983', function(){
                cy.get("input[datepicker]").first().focus().type("31/09/1983")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("contain","Ngày tháng không tồn tại")
                })
            })

            it('Nhập 31/11/1983', function(){
                cy.get("input[datepicker]").first().focus().type("31/11/1983")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("contain","Ngày tháng không tồn tại")
                })
            })

            it('Nhập 30/2/1983', function(){
                cy.get("input[datepicker]").first().focus().type("30/2/1983")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("contain","Ngày tháng không tồn tại")
                })
            })

            it('Nhập 29/2/1983', function(){
                cy.get("input[datepicker]").first().focus().type("29/2/1983")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("contain","Ngày tháng không tồn tại")
                })
            })
        })

        it('Nhập ngày tháng với năm YYYY<1000; ví dụ: 1/2/0999', function(){
            cy.get("input[datepicker]").first().focus().type("1/2/0999")
            cy.get("input[datepicker]").first().parent().parent().within(function(){
                cy.get(".text-error").should("contain","Ngày tháng không tồn tại")
            })
        })

        it('Nhập ngày tháng với năm YYYY>9999; ví dụ: 1/2/99999', function(){
            cy.get("input[datepicker]").first().focus().type("1/2/99999")
            cy.get("input[datepicker]").first().parent().parent().within(function(){
                cy.get(".text-error").should("contain","Ngày tháng không tồn tại")
            })
        })
    })
})