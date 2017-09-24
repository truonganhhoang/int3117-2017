var uuid = require('uuid');

describe('Kiểm tra chức năng trim space', function() {
    beforeEach(function() {
        cy.visit('signin');
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(2) > div > input').type('admin_10@gmail.com');
        cy.get('body > div > div.login.ng-scope > div.content > form > div:nth-child(3) > div > input').type('Methadone@2017');
        cy.get('body > div > div.login.ng-scope > div.content > form > button').click();
        cy.wait(1000);
    });

    var randInt = Date.now() % 10000000;
    var space = ' ';
    var randIntNotTrim = space + randInt + space;
    var randStr = uuid.v4();

    it('Danh mục tài chính', function () {
        cy.visit('main/admin/administrators/financials');
        cy.wait(500);

        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-title > div.inputs > a').click();

        // test fromfinancial
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div > div:nth-child(2) > input').type(randIntNotTrim);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div > div:nth-child(4) > input').type(randInt);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-footer > button').click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div > div:nth-child(2) > div > div').should('contain', 'Trường này không được để trống');
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div > div:nth-child(2) > input').focused().should('be.empty');

        // test tofinancial
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div > div:nth-child(2) > input').type(randInt);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div > div:nth-child(4) > input').type(randIntNotTrim);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-footer > button').click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div > div:nth-child(4) > div > div').should('contain', 'Trường này không được để trống');
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div > div:nth-child(4) > input').focused().should('be.empty');
    });

    it('Danh mục thuốc', function () {
        cy.visit('main/admin/administrators/medicine_list');
        cy.wait(500);

        cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-title > div.inputs > a').click();

        // test concentration
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(1) > div.col-xs-8.form-group > input').type(randStr);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(2) > div.col-xs-8.form-group > input').type(randStr);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(3) > div.col-xs-8.form-group > input').type(randIntNotTrim);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(4) > div.col-xs-8.form-group > input').type(randInt);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(5) > div.col-xs-8.form-group > input').type(randStr);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(7) > div.col-xs-8.form-group > div.ui-select-container.select2.select2-container.ng-pristine.ng-untouched.ng-scope.ng-empty.ng-invalid.ng-invalid-required > a > span.select2-chosen.ng-binding').click();
        cy.get('.select2-result-label.ui-select-choices-row-inner').eq(0).click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-footer > button').click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(3) > div.col-xs-8.form-group > div > div').should('contain', 'Trường này không được để trống');
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(3) > div.col-xs-8.form-group > input').focused().should('be.empty');

        // test packing
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(3) > div.col-xs-8.form-group > input').type(randInt);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(4) > div.col-xs-8.form-group > input').type(randIntNotTrim);
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-footer > button').click();
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(4) > div.col-xs-8.form-group > div > div').should('contain', 'Trường này không được để trống');
        cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(4) > div.col-xs-8.form-group > input').focused().should('be.empty');
    });
});