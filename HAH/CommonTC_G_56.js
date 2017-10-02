describe('Kiểm tra giá trị mặc định ch', function () {
  describe('CommonTC_G_56 Kiểm tra giá trị mặc định', function () {
    describe('Tài khoản quản trị hệ thống', function () {
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
	   //
		it('Thêm đơn thuốc ...', function () {
		  cy.get('.btn blue-custom btn-sm ng-binding .fa fa-plus').containt("Thêm đơn thuốc").click().wait(1000);
		});
		it('Thêm thuốc > Chia liều ...', function () {
		  cy.get('input.ng-vaild ng-dirty ng-vaild-parse ng-touched ng-empty [type="checkbox"]').puncheck().should('not.be.checked');
		});
		it('Thêm thuốc > Giảm liều', function () {
		  cy.get('input.ng-vaild ng-dirty ng-vaild-parse ng-touched ng-empty [type="checkbox"]').uncheck().should('not.be.checked');
		});
		it('Đóng...', function () {
		  cy.get('div.modal-footer input.btn-default btn-sm input[type=button]').click().should('not.exist');
		});
               //
		it('Chuyển cơ sở', function (){
		  cy.get('a.btn blue-custom btn-sm ng-binding i.fa fa-exchange').parent().contain("Chuyển cơ sở").click().wait(100);
		});
		it('Checkbox Chuyển tạm thời ...', function () {
		  cy.get('label.mt-checkbox input.ng-vaild [type="checkbox"]').parent().contain("Chuyển cở sở tạm thời").uncheck().should('not.be.checked');
		});
		it('Đóng...', function () {
		  cy.get('div.modal-footer input.btn-default btn-sm input[type=button]').click().should('not.exist');
		});
	    });	
	
    });
  });
});
