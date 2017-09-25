describe('Kiểm thử can le trai combobox Tinh hinh tai chinh', function() {

      beforeEach(function () {
        cy.visit("http://13.76.80.144/signin")
            .get("input[name='email']").type("admin_agency_10@gmail.com")
            .get("input[name='password']").type("Methadone@2017").type("{enter}")
            .wait(1000)
    });

    it('Kiểm tra giá trị mặc định', function() {
        cy.visit("http://13.76.80.144/main/patients/new");
 		cy.get("label").contains("Tình hình tài chính").next().find('a.select2-choice') 
 		cy.get('.select2-result-label.ui-select-choices-row-inner span').and('have.css', 'text-align')
 		.and('match', /left/)
    })

  })

