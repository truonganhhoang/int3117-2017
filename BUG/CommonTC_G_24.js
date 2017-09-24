describe('Tìm kiếm không phân biệt chữ hoa, chữ thường', function() {
    var testcases = [
        {
            url: 'http://52.187.8.102/main/admin/administrators',
            name: 'Quản lý người dùng',
            expect: 'Đoàn'
        },
        {
            url: 'http://52.187.8.102/main/admin/administrators/issuing_agency',
            name: 'Quản lý cơ sở',
            expect: 'Phú Xuyên'
        },
        {
            url: 'http://52.187.8.102/main/admin/administrators/employments',
            name: 'Danh mục nghề nghiệp',
            expect: 'Trí thức'
        },
        {
            url: 'http://52.187.8.102/main/admin/administrators/maritals',
            name: 'Danh mục hôn nhân',
            expect: 'hôn'
        },
        {
            url: 'http://52.187.8.102/main/admin/administrators/financials',
            name: 'Danh mục tài chính',
            expect: 'đến'
        },
        {
            url: 'http://52.187.8.102/main/admin/administrators/educations',
            name: 'Danh mục trình độ học vấn',
            expect: 'Mù chữ'
        },
        {
            url: 'http://52.187.8.102/main/admin/administrators/stop_reasons',
            name: 'Danh mục lý do ngừng điều trị',
            expect: 'Đã chết'
        },
        {
            url: 'http://52.187.8.102/main/admin/administrators/medicine_list',
            name: 'Danh mục thuốc',
            expect: 'Methadol'
        },
        {
            url: 'http://52.187.8.102/main/admin/administrators/manufacturers',
            name: 'Danh mục nhà sản xuất',
            expect: 'Vidipha'
        },
        {
            url: 'http://52.187.8.102/main/admin/administrators/providers',
            name: 'Danh mục nhà phân phối',
            expect: 'Codupha'
        },
        {
            url: 'http://52.187.8.102/main/admin/administrators/sources',
            name: 'Danh mục nguồn thuốc',
            expect: 'test'
        },
        {
            url: 'http://52.187.8.102/main/patients/720/detail/executive_info',
            name: 'Danh sách bệnh nhân',
            expect: 'Dung'
        }
    ];

    beforeEach(function() {
        cy.visit('http://52.187.8.102/');
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(2) > div > input').type('admin_10@gmail.com');
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(3) > div > input').type('Methadone@2017');
        cy.get('body > div > div.login.ng-scope > div.content > form > button').click();
        cy.wait(1000);
    });

    testcases.forEach(function(testcase) {
        it(testcase.name, function() {
            cy.visit(testcase.url);
            cy.wait(500);

            // search
            cy.get('[ng-model="keyword"]').type(testcase.expect.toUpperCase()).type('{enter}');
            cy.get('tbody > tr:first-child').should('contain', testcase.expect);
        });
    });
});
