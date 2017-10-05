describe('CommonTC_G_46 Kiểm tra giá trị mặc định', function () {
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
				cy.contains('div.form-group', 'Y lệnh').find('textarea').should('empty');
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
				cy.contains('div.portlet div', 'Ý kiến Hội đồng kiểm nhập').next().find('textarea').should('empty');
			});
		});
	});
});
