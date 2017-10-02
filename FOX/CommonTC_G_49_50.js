
function getRandomString(){
    return Math.random().toString(36).substr(2).replace(/[^a-zA-Z0-9]+/g, '_');
}

function getRandomSpecialString(length){
	var str = '';
	var map = '!@#$%^&*()-_=+[]{};\':",.<>/?`~\\|';
	for (var i = 0; i < length; i++) str += map.charAt(Math.floor(Math.random() * map.length));
    return str;
}

var RANDOM_STRING = 'test_' + getRandomString();
var RANDOM_PASSWORD = RANDOM_STRING + getRandomSpecialString(8);
var RANDOM_HTML = '</div>' + RANDOM_PASSWORD;
var RANDOM_HTML_WITH_SPACE = '     ' + RANDOM_HTML + '     ';
var RANDOM_NUMBER = Math.floor(Math.random() * 20) + 10
		
describe('Kiểm tra TextArea', function () {
	describe('CommonTC_G_49_50 Kiểm tra khi nhập dữ liệu là các ký tự đặc biệt, thẻ html; Kiểm tra chức năng Trim space', function () {
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
				});
				
				it('Thêm đơn thuốc...', function () {
					cy.contains('div.actions > a.btn', 'Thêm đơn thuốc').click().wait(1000);
					
					cy.get('div.modal-dialog div.ui-select-container[name=medicine_list_id]').click();
					cy.contains('div.ui-select-container li.ui-select-choices-row', 'Methadone hydroclorid').first().click();
					
					cy.get('div.modal-dialog input[name=dosage]').type(RANDOM_NUMBER);
					cy.get('div.modal-dialog input[name=duration]').type(1);
					cy.get('div.modal-dialog textarea[name=description]').type(RANDOM_HTML);
					
					cy.contains('div.modal-dialog button[type=submit]', 'Lưu').click().should('not.exist');
				});
				
				it('Kiểm tra ký tự đặc biệt, thẻ html', function () {
					cy.contains('div.events-content p', 'Y lệnh').should('contain', RANDOM_HTML);
				});
				it('Kiểm tra chức năng Trim space', function () {
					cy.contains('div.events-content p', 'Y lệnh').should('not.contain', RANDOM_HTML_WITH_SPACE);
				});
			});
		});
	});
});
