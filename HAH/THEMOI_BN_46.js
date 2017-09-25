    describe('Kiểm tra combo-box "Tình hình tài chính"', function () {
        beforeEach(function () {
            cy.visit("http://13.76.80.144/signin")
                .get("input[name='email']").type("admin_agency_10@gmail.com")
                .get("input[name='password']").type("Methadone@2017").type("{enter}")
                .wait(1000)
        });
     
        it('Kiểm tra giá trị mặc định', function(){
            cy.visit("http://13.76.80.144/main/patients/new");
            cy.get("label").contains("Tình hình tài chính").next().find('a.select2-choice')
                .should('have.attr', 'placeholder', '-- Vui lòng chọn --');
        });
    })
