var uuid = require('uuid');

describe('Nhập dữ liệu là số có chữ số 0 đầu tiên', function() {
    beforeEach(function() {
        cy.visit('signin');
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(2) > div > input').type('admin_10@gmail.com');
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(3) > div > input').type('Methadone@2017');
        cy.get('body > div > div.login.ng-scope > div.content > form > button').click();
        cy.wait(1000);
    });

    var randInt = Date.now() % 100000000;
    var zero = '0';
    var randIntNotTrim = zero + randInt;
    var randStr = uuid.v4();

    it('Danh mục tài chính', function () {
        cy.visit('main/admin/administrators/financials');
        cy.wait(500);

        // add
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-title > div.inputs > a').click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div > div:nth-child(2) > input').type(randIntNotTrim);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div > div:nth-child(4) > input').type(randIntNotTrim);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-footer > button').click();
        cy.wait(1000);

        // test
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-title > div.row > div > div:nth-child(1) > form > input').type(randInt).type('{enter}');
        cy.get('#currency-no-fractions').should('not.contain', 'Từ ' + zero).and('not.contain', 'đến ' + zero);
    });

    it('Danh mục thuốc', function () {
        cy.visit('main/admin/administrators/medicine_list');
        cy.wait(500);

        // add
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-title > div.inputs > a').click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(1) > div.col-xs-8.form-group > input').type(randStr);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(2) > div.col-xs-8.form-group > input').type(randStr);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(3) > div.col-xs-8.form-group > input').type(zero + '1111');
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(4) > div.col-xs-8.form-group > input').type(zero + '1111');
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(5) > div.col-xs-8.form-group > input').type(randStr);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(7) > div.col-xs-8.form-group > div.ui-select-container.select2.select2-container.ng-pristine.ng-untouched.ng-scope.ng-empty.ng-invalid.ng-invalid-required > a > span.select2-chosen.ng-binding').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-footer > button').click();
        cy.wait(1000);

        // test
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-title > div.row > div > div:nth-child(1) > form > input').type(randStr).type('{enter}');
        cy.wait(500);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-body > div.max-width-100-pc.scrollable > table > tbody > tr:nth-child(1) > td:nth-child(4)').should('not.contain', zero);
        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-body > div.max-width-100-pc.scrollable > table > tbody > tr:nth-child(1) > td:nth-child(5)').should('not.contain', zero);
    });
});