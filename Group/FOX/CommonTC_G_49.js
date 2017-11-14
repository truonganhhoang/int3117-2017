
function getRandomString() {
	return Math.random().toString(36).substr(2).replace(/[^a-zA-Z0-9]+/g, '_');
}
function getRandomSpecialString(length) {
	var str = '';
	var map = '!@#$%^&*()-_=+[]{};\':",.<>/?`~\\|';
	for (var i = 0; i < length; i++)
		str += map.charAt(Math.floor(Math.random() * map.length));
	return str;
}
var RANDOM_STRING = 'test_' + getRandomString();
var RANDOM_PASSWORD = RANDOM_STRING + getRandomSpecialString(8);
var RANDOM_HTML = '</div>' + RANDOM_PASSWORD;
var RANDOM_NUMBER = Math.floor(Math.random() * 20) + 10;

describe('CommonTC_G_49 Kiểm tra khi nhập dữ liệu là các ký tự đặc biệt, thẻ html', function () {
	describe('Tài khoản trưởng cơ sở', function () {
		it('Đăng nhập...', function () {
			cy.visit(Cypress.env('URL_LOGIN'));
			cy.get('input[name=email]').type(Cypress.env('USER_AGENCY'));
			cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'));
			cy.get('button[type=submit]').click().should('not.exist');
		});

		describe('Quản lý bệnh nhân', function () {
			it('Chuyển trang...', function () {
				cy.get('li.nav-item > a[ui-sref="main.patients"]').click().wait(1000);
				cy.contains('div.actions > a.btn', 'Thêm đơn thuốc').click().wait(1000);
			});

			it('Kiểm tra ký tự đặc biệt, thẻ html', function () {
				cy.contains('div.form-group', 'Loại đơn thuốc').find('a.select2-choice').click();
				cy.get('div.ui-select-container div.ui-select-choices-row-inner').first().click();
				cy.contains('div.form-group', 'Tên thuốc').find('a.select2-choice').click();
				cy.contains('div.ui-select-container div.ui-select-choices-row-inner', 'Methadone hydroclorid').first().click();
				cy.contains('div.form-group', 'Liều lượng mới').find('input').type(RANDOM_NUMBER);
				cy.contains('div.form-group', 'Thời lượng').find('input').type('1');
				cy.contains('div.form-group', 'Y lệnh').find('textarea').type(RANDOM_HTML);
				
				cy.contains('div.modal-footer button', 'Lưu').click().should('not.exist');
				
				cy.contains('div.events-content p', 'Y lệnh').should('contain', RANDOM_HTML);
			});
		});
	});
});
