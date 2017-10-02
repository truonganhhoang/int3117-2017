
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
var RANDOM_HTML_WITH_SPACE = '     ' + RANDOM_HTML + '     ';
var RANDOM_NUMBER = Math.floor(Math.random() * 20) + 10;

describe('Kiểm tra combo-box "Tình trạng hôn nhân"', function () {
	describe('Tài khoản bác sĩ', function () {
		it('Đăng nhập...', function () {
			cy.visit(Cypress.env('URL_LOGIN'));
			cy.get('input[name=email]').type(Cypress.env('USER_DOCTOR'));
			cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'));
			cy.get('button[type=submit]').click().should('not.exist');
		});

		describe('Quản lý bệnh nhân', function () {
			it('Thêm bệnh nhân...', function () {
				cy.get('li.nav-item > a[ui-sref="main.patients"]').click().wait(1000);
				cy.get('a.btn[href="/main/patients/new"]').click().wait(1000);
				cy.contains('div.portlet', 'Thông tin chi tiết').should('visible');
			});

			it('THEMMOI_BN_38 Kiểm tra giá trị mặc định', function () {
				cy.contains('div.form-group', 'Tình trạng hôn nhân').find('span.select2-chosen').contains('-- Vui lòng chọn --').should('visible');
			});
			it('THEMMOI_BN_39 Kiểm tra số lượng và sắp xếp các giá trị trong combo', function () {
				cy.contains('div.form-group', 'Tình trạng hôn nhân').find('a.select2-choice').click();
				cy.get('div.ui-select-container div.ui-select-choices-row-inner').should(function (elements) {
					for (var i = 1; i < elements.length; i++) {
						expect(elements[i].textContent > elements[i - 1].textContent).to.be.true;
					}
				});
			});
			it('THEMMOI_BN_40 Kiểm tra căn lề', function () {
				cy.get('div.ui-select-container div.ui-select-choices-row-inner').should('have.css','text-align','left');
			});
			
			//cy.contains('div.modal-dialog button[type=submit]', 'Lưu').click().should('not.exist');
		});
	});
});
