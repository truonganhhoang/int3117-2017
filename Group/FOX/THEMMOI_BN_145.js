
var ARRAY_STRING = ['Bố', 'Mẹ', 'Vợ/Chồng', 'Anh chị em ruột', 'Con trai/gái', 'Liên hệ khác'];

describe('THEMMOI_BN_145 Kiểm tra giá trị mặc định', function () {
	describe('Tài khoản bác sĩ', function () {
		it('Đăng nhập...', function () {
			cy.visit(Cypress.env('URL_LOGIN'));
			cy.get('input[name=email]').type(Cypress.env('USER_DOCTOR'));
			cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'));
			cy.get('button[type=submit]').click().should('not.exist');
		});

		describe('Quản lý bệnh nhân > Thêm bệnh nhân', function () {
			it('Combo-box "Mối quan hệ"', function () {
				cy.contains('li.nav-item > a', 'Quản lý bệnh nhân').click().wait(1000);
				cy.contains('div.inputs > a', 'Thêm').click().wait(1000);

				cy.contains('div.portlet', 'Thông tin chi tiết').should('visible');
				cy.contains('div.form-group', 'Mối quan hệ').find('span.select2-chosen').contains('-- Vui lòng chọn --').should('visible').click();
				//cy.contains('div.form-group', 'Mối quan hệ').find('span.select2-chosen').contains('-- Chọn loại liên hệ --').should('visible').click();
				cy.get('div.ui-select-container div.ui-select-choices-row-inner').should('length', 6).and(function (elements) {
					for (var i = 0; i < elements.length; i++) {
						expect(elements[i].textContent.trim() === ARRAY_STRING[i]).to.be.true;
					}
				});
			});
		});
	});
});
