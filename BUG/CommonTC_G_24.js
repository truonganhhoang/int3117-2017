describe('Tìm kiếm không phân biệt chữ hoa, chữ thường', function() {
    var testcases = [
        {
            url: 'main/admin/administrators',
            name: 'Quản lý người dùng',
            expect: 'Đoàn'
        },
        {
            url: 'main/admin/administrators/issuing_agency',
            name: 'Quản lý cơ sở',
            expect: 'Phú Xuyên'
        },
        {
            url: 'main/admin/administrators/employments',
            name: 'Danh mục nghề nghiệp',
            expect: 'Trí thức'
        },
        {
            url: 'main/admin/administrators/maritals',
            name: 'Danh mục hôn nhân',
            expect: 'hôn'
        },
        {
            url: 'main/admin/administrators/financials',
            name: 'Danh mục tài chính',
            expect: 'đến'
        },
        {
            url: 'main/admin/administrators/educations',
            name: 'Danh mục trình độ học vấn',
            expect: 'Mù chữ'
        },
        {
            url: 'main/admin/administrators/stop_reasons',
            name: 'Danh mục lý do ngừng điều trị',
            expect: 'Đã chết'
        },
        {
            url: 'main/admin/administrators/medicine_list',
            name: 'Danh mục thuốc',
            expect: 'Methadol'
        },
        {
            url: 'main/admin/administrators/manufacturers',
            name: 'Danh mục nhà sản xuất',
            expect: 'Vidipha'
        },
        {
            url: 'main/admin/administrators/providers',
            name: 'Danh mục nhà phân phối',
            expect: 'Codupha'
        },
        {
            url: 'main/admin/administrators/sources',
            name: 'Danh mục nguồn thuốc',
            expect: 'test'
        },
        {
            url: 'main/patients/720/detail/executive_info',
            name: 'Danh sách bệnh nhân',
            expect: 'Dung'
        }
    ];

    beforeEach(function() {
        cy.visit('signin');
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
