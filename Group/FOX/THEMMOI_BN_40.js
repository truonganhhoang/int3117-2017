
describe('THEMMOI_BN_40 Kiểm tra căn lề', function () {
	describe('Tài khoản bác sĩ', function () {
		it('Đăng nhập...', function () {
			cy.visit(Cypress.env('URL_LOGIN'));
			cy.get('input[name=email]').type(Cypress.env('USER_DOCTOR'));
			cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'));
			cy.get('button[type=submit]').click().should('not.exist');
		});

		describe('Quản lý bệnh nhân', function () {
			it('Combo-box "Tình trạng hôn nhân"', function () {
				cy.contains('li.nav-item > a', 'Quản lý bệnh nhân').click().wait(1000);
				cy.contains('div.inputs > a', 'Thêm').click().wait(1000);
				
				cy.contains('div.portlet', 'Thông tin chi tiết').should('visible');
				
				cy.contains('div.form-group', 'Tình trạng hôn nhân').find('a.select2-choice').click();
				cy.get('div.ui-select-container div.ui-select-choices-row-inner').should('have.css','text-align','left');
			});
		});
	});
});
