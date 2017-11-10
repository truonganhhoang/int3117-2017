describe('Kiểm tra khi trường ngày tháng có định dạng DD/MM/YYYY hợp lệ', function() {
    
      context('CommonTC_G_79', function(){
        beforeEach(function(){
            cy.visit("signin")
                cy.get('input[name=email]').type('doctor_10@gmail.com')
                cy.get('input[name=password]').type('Methadone@2017{enter}')
                cy.wait(3000)
                cy.visit("main/patients/new")
        })

        describe('Kiểm tra với các giá trị cụ thể', function(){
            it('Nhập 31/01/1983', function(){
                cy.get("input[datepicker]").first().focus().type("31/1/1983{enter}")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("have.class","ng-inactive")
                })
                cy.get("input[datepicker]").first().should("have.value", "31/01/1983")
            })

            it('Nhập 31/03/1983', function(){
                cy.get("input[datepicker]").first().focus().type("31/3/1983{enter}")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("have.class","ng-inactive")
                })
                cy.get("input[datepicker]").first().should("have.value", "31/03/1983")
            })

            it('Nhập 31/05/1983', function(){
                cy.get("input[datepicker]").first().focus().type("31/5/1983{enter}")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("have.class","ng-inactive")
                })
                cy.get("input[datepicker]").first().should("have.value", "31/05/1983")
            })

            it('Nhập 31/07/1983', function(){
                cy.get("input[datepicker]").first().focus().type("31/7/1983{enter}")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("have.class","ng-inactive")
                })
                cy.get("input[datepicker]").first().should("have.value", "31/07/1983")
            })

            it('Nhập 31/08/1983', function(){
                cy.get("input[datepicker]").first().focus().type("31/8/1983{enter}")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("have.class","ng-inactive")
                })
                cy.get("input[datepicker]").first().should("have.value", "31/08/1983")
            })

            it('Nhập 31/10/1983', function(){
                cy.get("input[datepicker]").first().focus().type("31/10/1983{enter}")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("have.class","ng-inactive")
                })
                cy.get("input[datepicker]").first().should("have.value", "31/10/1983")
            })

            it('Nhập 31/12/1983', function(){
                cy.get("input[datepicker]").first().focus().type("31/12/1983{enter}")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("have.class","ng-inactive")
                })
                cy.get("input[datepicker]").first().should("have.value", "31/12/1983")
            })

            it('Nhập 29/2/1983', function(){
                cy.get("input[datepicker]").first().focus().type("29/2/1980{enter}")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("have.class","ng-inactive")
                })
                cy.get("input[datepicker]").first().should("have.value", "29/02/1980")
            })

            it('Nhập 28/2/1983', function(){
                cy.get("input[datepicker]").first().focus().type("28/2/1983{enter}")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("have.class","ng-inactive")
                })
                cy.get("input[datepicker]").first().should("have.value", "28/02/1983")
            })

            it('Nhập 30/4/1983', function(){
                cy.get("input[datepicker]").first().focus().type("30/4/1983{enter}")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("have.class","ng-inactive")
                })
                cy.get("input[datepicker]").first().should("have.value", "30/04/1983")
            })

            it('Nhập 30/6/1983', function(){
                cy.get("input[datepicker]").first().focus().type("30/6/1983{enter}")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("have.class","ng-inactive")
                })
                cy.get("input[datepicker]").first().should("have.value", "30/06/1983")
            })

            it('Nhập 30/9/1983', function(){
                cy.get("input[datepicker]").first().focus().type("30/9/1983{enter}")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("have.class","ng-inactive")
                })
                cy.get("input[datepicker]").first().should("have.value", "30/09/1983")
            })

            it('Nhập 30/11/1983', function(){
                cy.get("input[datepicker]").first().focus().type("30/11/1983{enter}")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("have.class","ng-inactive")
                })
                cy.get("input[datepicker]").first().should("have.value", "30/11/1983")
            })

            it('Nhập 10/10/1983', function(){
                cy.get("input[datepicker]").first().focus().type("10/10/1983{enter}")
                cy.get("input[datepicker]").first().parent().parent().within(function(){
                    cy.get(".text-error").should("have.class","ng-inactive")
                })
                cy.get("input[datepicker]").first().should("have.value", "10/10/1983")
            })

            it('Nhập 1/2/1000', function(){
                cy.get("input[datepicker]").first().focus().type("1/2/1000{enter}")
                cy.get("input[datepicker]").first().should("have.value", "01/02/1000")
            })

            it('Nhập 1/2/9999', function(){
                cy.get("input[datepicker]").first().focus().type("1/2/9999{enter}")
                cy.get("input[datepicker]").first().should("have.value", "01/02/9999")
            })
        })
    })
})