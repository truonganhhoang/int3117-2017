function getTodayString() {
	var today = new Date();
	return today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
}

var STRING_TODAY = getTodayString();

describe('CommonTC_G_47 Kiểm tra dữ liệu là bắt buộc nhập', function () {
	describe('Tài khoản trưởng cơ sở', function () {
		it('Đăng nhập...', function () {
			cy.visit(Cypress.env('URL_LOGIN'));
			cy.get('input[name=email]').type(Cypress.env('USER_AGENCY'));
			cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'));
			cy.get('button[type=submit]').click().should('not.exist');
		});

		describe('Quản lý bệnh nhân', function () {
			it('Chuyển trang...', function () {
				cy.contains('li.nav-item > a', 'Quản lý bệnh nhân').click().wait(1000);
				cy.contains('div.actions > a.btn', 'Thêm đơn thuốc').click().wait(1000);
			});

			it('Textarea Thêm đơn thuốc > Y lệnh', function () {
				cy.contains('div.form-group', 'Loại đơn thuốc').find('a.select2-choice').click();
				cy.get('div.ui-select-container div.ui-select-choices-row-inner').first().click();
				cy.contains('div.form-group', 'Tên thuốc').find('a.select2-choice').click();
				cy.contains('div.ui-select-container div.ui-select-choices-row-inner', 'Methadone hydroclorid').first().click();
				cy.contains('div.form-group', 'Liều lượng mới').find('input').type('100');
				cy.contains('div.form-group', 'Thời lượng').find('input').type('1');
				
				cy.contains('div.modal-footer button', 'Lưu').click().should('not.exist');
				cy.contains('div.toast', 'thành công').should('visible');
			});
		});
	});
	describe('Tài khoản quản lý kho', function () {
		it('Đăng nhập...', function () {
			cy.visit(Cypress.env('URL_LOGIN'));
			cy.get('input[name=email]').type(Cypress.env('USER_STORE'));
			cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'));
			cy.get('button[type=submit]').click().should('not.exist');
		});

		describe('Báo cáo > Biên bản kiểm nhập', function () {
			it('Chuyển trang...', function () {
				cy.get('div.page-logo > div.menu-toggler').click();
				cy.contains('li.nav-item > a.nav-link', 'Báo cáo').should('visible').click();
				cy.contains('li.nav-item > a', 'Biên bản kiểm nhập').should('visible').click().wait(1000);
			});

			it('Textarea Hội đồng kiểm kê gồm > Ý kiến Hội đồng kiểm nhập', function () {
				cy.contains('div.portlet label.required', 'Từ ngày').next().find('input').type('01/01/2017{enter}');
				cy.contains('div.portlet label.required', 'Đến ngày').next().find('input').type(STRING_TODAY + '{enter}');
				cy.get('input[ng-model="council.name"]').type('Hoàng Đăng Chấn');
				cy.get('input[ng-model="council.title"]').type('Đại tướng');
				cy.get('input[ng-model="voucher.datee"]').type(STRING_TODAY + '{enter}');
				cy.contains('div.portlet div', 'Ý kiến Hội đồng kiểm nhập').next().find('textarea').should('empty');
				
				cy.contains('div.actions > button', 'In').click().wait(1000);
				cy.contains('div.modal-dialog', 'Biên bản kiểm nhập').should('visible');
			});
		});
	});
});
