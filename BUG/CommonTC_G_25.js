var uuid = require('uuid');

describe('Kiểm tra khi nhập dữ liệu là các thẻ html', function() {
    beforeEach(function() {
        cy.visit('signin');
    });

    var html = '</table>';
    var randInt = Date.now();
    var randStr = uuid.v4();
    var html_randStr = html + randStr;

    it('Thêm đơn thuốc', function() {
        // login as trưởng cơ sở
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(2) > div > input').type('admin_agency_10@gmail.com');
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(3) > div > input').type('Methadone@2017');
        cy.get('body > div > div.login.ng-scope > div.content > form > button').click();
        cy.wait(1000);

        cy.visit('main/patients');
        cy.wait(500);

        // add
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > div > div.portlet-title.tabbable-line > div.actions.ng-scope > a:nth-child(1)').click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(3) > div.ui-select-container.select2.select2-container.ng-pristine.ng-untouched.ng-scope.ng-empty.ng-invalid.ng-invalid-required > a').click();
        cy.get('body > div.ui-select-container.select2.select2-container.ng-pristine.ng-untouched.ng-scope.ng-empty.ng-invalid.ng-invalid-required.select2-container-active.select2-dropdown-open.open > div > ul > li > ul > li:nth-child(2)').click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(5) > input').type(100);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(7) > input').type(100);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(9) > textarea').type(html);
        cy.get('#submit').click();

        // test
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > div > div.portlet-body > div > div > div > ul > li:nth-child(3)').click();
        cy.wait(500);
        cy.get('#print_container > div > div:nth-child(3) > div > table > tbody > tr:nth-child(1) > td:nth-child(11) > a').click();
        cy.get('#pdf > p:nth-child(29)').should('contain', html);
    });

    it('Thêm mới bệnh nhân', function() {
        // login as trưởng cơ sở
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(2) > div > input').type('admin_agency_10@gmail.com');
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(3) > div > input').type('Methadone@2017');
        cy.get('body > div > div.login.ng-scope > div.content > form > button').click();
        cy.wait(1000);

        cy.visit('main/patients/new');
        cy.wait(500);

        // required fields
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div.row.fow-flex > div.col-xs-12.col-md-x170px > div > div:nth-child(1) > div > input').type(html_randStr);
        cy.get('body > div.ng-scope > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div.row.fow-flex > div.col-xs-12.col-md-x170px > div > div:nth-child(2) > div > label.input-group > input').type('15/02/1996');
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div.row.fow-flex > div.col-xs-12.col-md-x170px > div > div:nth-child(3) > div > div.ui-select-container.select2.select2-container.ng-empty.ng-invalid.ng-invalid-required > a').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();
        cy.get('body > div.ng-scope > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div.row.fow-flex > div.col-xs-12.col-md-x170px > div > div:nth-child(10) > div > label.input-group > input').type('15/02/2000');
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div.row.fow-flex > div.col-xs-12.col-md-x170px > div > div.col-xs-12.col-md-6 > div > input').type(html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(2) > div:nth-child(3) > div > div.ui-select-container.select2.select2-container.ng-empty.ng-invalid.ng-invalid-required > a > span.select2-chosen.ng-binding').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(2) > div:nth-child(4) > div > input').type(html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(2) > div.col-xs-12.col-md-6 > div > input').type(html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(3) > div:nth-child(1) > div > a').click();
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(4) > div:nth-child(1) > div > div.ui-select-container.select2.select2-container.ng-empty.ng-invalid.ng-invalid-required > a > span.select2-chosen.ng-binding').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(4) > div:nth-child(2) > div > input').type(html_randStr);
        cy.get('body > div.ng-scope > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(4) > div:nth-child(3) > div > label.input-group > input').type('15/02/2017');
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(4) > div:nth-child(4) > div > input').type(html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div.general-item-list > div > div > div:nth-child(1) > div > input').type(html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div.general-item-list > div > div > div:nth-child(2) > div > div.ui-select-container.select2.select2-container.ng-pristine.ng-untouched.ng-scope.ng-empty.ng-invalid.ng-invalid-required > a').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div.general-item-list > div > div > div:nth-child(3) > div > a:nth-child(3) > i').click();
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-title.tabbable-line > div.inputs > button').click();
        cy.wait(1000);

        // test
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-4.padding-right-5.hidden-sm.hidden-xs > div > div.portlet-body > div.max-width-100-pc.scrollable > table > tbody > tr.ng-scope.active_patient > td:nth-child(3) > a').should('contain', html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > div > div.portlet-body > div > div > div > div > div > div.row.fow-flex.ng-scope > div.col-xs-12.col-md-x170px > table > tbody > tr:nth-child(1) > td:nth-child(2)').should('contain', html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > div > div.portlet-body > div > div > div > div > div > div.row.fow-flex.ng-scope > div.col-xs-12.col-md-x170px > table > tbody > tr:nth-child(3) > td:nth-child(2)').should('contain', html + ' - ' + html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > div > div.portlet-body > div > div > div > ul > li:nth-child(2)').click();
        cy.wait(500);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > div > div.portlet-body > div > div > div > div > div > div > div:nth-child(1) > div > div > div > table > tbody > tr:nth-child(7) > td:nth-child(2)').should('contain', html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > div > div.portlet-body > div > div > div > div > div > div > div:nth-child(1) > div > div > div > table > tbody > tr:nth-child(8) > td:nth-child(2)').should('contain', html + ' - ' + html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > div > div.portlet-body > div > div > div > div > div > div > div:nth-child(2) > div.max-width-100-pc.scrollable > table > tbody > tr:nth-child(2) > td:nth-child(2)').should('contain', html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > div > div.portlet-body > div > div > div > div > div > div > div:nth-child(2) > div.max-width-100-pc.scrollable > table > tbody > tr:nth-child(4) > td:nth-child(2)').should('contain', html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > div > div.portlet-body > div > div > div > div > div > div > div:nth-child(2) > div.tabbable-line > div > div > div > table > tbody > tr.ng-scope > td:nth-child(1) > div').should('contain', html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > div > div.portlet-body > div > div > div > div > div > div > div:nth-child(2) > div.tabbable-line > div > div > div > table > tbody > tr.ng-scope > td.align-left.ng-binding').should('contain', html + ' - ' + html);
    });

    it('Quản lý người dùng', function () {
        // login as admin
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(2) > div > input').type('admin_10@gmail.com');
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(3) > div > input').type('Methadone@2017');
        cy.get('body > div > div.login.ng-scope > div.content > form > button').click();
        cy.wait(1000);

        cy.visit('main/admin/administrators');
        cy.wait(500);

        // add
        var email = 'test_' + randInt + '@gmail.com';
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-title > div.inputs > a').click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(1) > input').type(email);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(2) > input').type('1234abcdXYZ!@#');
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(3) > input').type(html);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(4) > input').type(html);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(5) > div.ui-select-container.select2.select2-container.ng-pristine.ng-untouched.ng-scope.ng-empty.ng-invalid.ng-invalid-required > a > span.select2-chosen.ng-binding').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-footer > button').click();
        cy.wait(1000);

        // test
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-title > div.inputs > div > div > form > input').type(email).type('{enter}');
        cy.wait(500);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-body > div.max-width-100-pc.scrollable > table > tbody > tr:nth-child(1) > td:nth-child(2)').should('contain', '</table> </table>');
    });

    it('Quản lý cơ sở', function() {
        // login as admin
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(2) > div > input').type('admin_10@gmail.com');
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(3) > div > input').type('Methadone@2017');
        cy.get('body > div > div.login.ng-scope > div.content > form > button').click();
        cy.wait(1000);

        cy.visit('main/admin/administrators/issuing_agency');
        cy.wait(500);

        // add
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-title > div.inputs > a').click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(1) > div:nth-child(2) > input').type(html);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(1) > div:nth-child(4) > input').type(html);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(2) > div:nth-child(2) > div.ui-select-container.select2.select2-container.ng-pristine.ng-untouched.ng-scope.ng-empty.ng-invalid.ng-invalid-required > a > span.select2-chosen.ng-binding').click();
        cy.get('#ui-select-choices-row-0-0 > div > span').click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(2) > div:nth-child(4) > div.ui-select-container.select2.select2-container.ng-pristine.ng-untouched.ng-scope.ng-empty.ng-invalid.ng-invalid-required > a > span.select2-chosen.ng-binding').click();
        cy.get('#ui-select-choices-row-1-0 > div').click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(2) > div:nth-child(6) > div.ui-select-container.select2.select2-container.ng-pristine.ng-untouched.ng-scope.ng-empty.ng-invalid.ng-invalid-required > a > span.select2-chosen.ng-binding').click();
        cy.get('#ui-select-choices-row-2-0 > div').click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-footer > button').click();
        cy.wait(1000);

        // test
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-body > div.max-width-100-pc.scrollable > table > tbody > tr:nth-child(1) > td:nth-child(3)').should('contain', html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-body > div.max-width-100-pc.scrollable > table > tbody > tr:nth-child(1) > td:nth-child(7)').should('contain', html);
    });

    it('Danh mục thuốc', function() {
        // login as admin
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(2) > div > input').type('admin_10@gmail.com');
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(3) > div > input').type('Methadone@2017');
        cy.get('body > div > div.login.ng-scope > div.content > form > button').click();
        cy.wait(1000);

        cy.visit('main/admin/administrators/medicine_list');
        cy.wait(500);

        // add
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-title > div.inputs > a').click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(1) > div.col-xs-8.form-group > input').type(html_randStr);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(2) > div.col-xs-8.form-group > input').type(html);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(3) > div.col-xs-8.form-group > input').type(10);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(4) > div.col-xs-8.form-group > input').type(1000);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(5) > div.col-xs-8.form-group > input').type(html);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(7) > div.col-xs-8.form-group > div.ui-select-container.select2.select2-container.ng-pristine.ng-untouched.ng-scope.ng-empty.ng-invalid.ng-invalid-required > a > span.select2-chosen.ng-binding').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-footer > button').click();
        cy.wait(1000);

        // test
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-title > div.row > div > div:nth-child(1) > form > input').type(randStr).type('{enter}');
        cy.wait(500);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-body > div.max-width-100-pc.scrollable > table > tbody > tr:nth-child(1) > td:nth-child(2)').should('contain', html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-body > div.max-width-100-pc.scrollable > table > tbody > tr:nth-child(1) > td:nth-child(3)').should('contain', html);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-body > div.max-width-100-pc.scrollable > table > tbody > tr:nth-child(1) > td:nth-child(6)').should('contain', html);
    });

    var testcases = [
        {
            url: 'main/admin/administrators/employments',
            name: 'Danh mục nghề nghiệp'
        },
        {
            url: 'main/admin/administrators/maritals',
            name: 'Danh mục hôn nhân'
        },
        {
            url: 'main/admin/administrators/educations',
            name: 'Danh mục trình độ học vấn'
        },
        {
            url: 'main/admin/administrators/stop_reasons',
            name: 'Danh mục lý do ngừng điều trị'
        },
        {
            url: 'main/admin/administrators/manufacturers',
            name: 'Danh mục nhà sản xuất'
        },
        {
            url: 'main/admin/administrators/providers',
            name: 'Danh mục nhà phân phối'
        },
        {
            url: 'main/admin/administrators/sources',
            name: 'Danh mục nguồn thuốc'
        }
    ];

    testcases.forEach(function(testcase) {
        it(testcase.name, function() {
            // login as admin
            cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(2) > div > input').type('admin_10@gmail.com');
            cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(3) > div > input').type('Methadone@2017');
            cy.get('body > div > div.login.ng-scope > div.content > form > button').click();
            cy.wait(1000);

            cy.visit(testcase.url);
            cy.wait(500);

            // add
            cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-title > div.inputs > a').click();
            cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body input').type(html_randStr);
            cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-footer > button').click();
            cy.wait(1000);

            // test
            cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-title > div.row > div > div:nth-child(1) > form > input').type(randStr).type('{enter}');
            cy.wait(500);
            cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-body > div.max-width-100-pc.scrollable > table > tbody > tr > td:nth-child(2)').should('contain', html);
        });
    });
});