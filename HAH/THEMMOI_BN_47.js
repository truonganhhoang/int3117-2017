describe('Kiểm tra combo-box "Tình hình tài chính"', function () {
    beforeEach(function () {
        cy.visit("http://13.76.80.144/signin")
            .get("input[name='email']").type("admin_agency_10@gmail.com")
            .get("input[name='password']").type("Methadone@2017").type("{enter}")
            .wait(1000)
    });

    var fstatus = ['Giàu', 'Nghèo', 'Trung bình', 'Khác'];

    it('Kiểm tra giá trị mặc định', function () {
        cy.visit("http://13.76.80.144/main/patients/new");
        var ele = cy.get("label").contains("Tình hình tài chính").next();

        ele.click();

        var value;
        var flag = false
        cy.get("#ui-select-choices-18 > li > div").find("span").then(function($spans) {
            console.log($spans);
            var types = [];
            $spans.each(function(i, span) {
                cy.wrap(span).then(function($span) {
                    types.push($span.text());
                });
            });

            types.sort();

            $spans.each(function(i, span) {
                cy.wrap(span).then(function($span) {
                    expect($span.text()).to.equal(types[i]);
                });
            });
        })
    });
});