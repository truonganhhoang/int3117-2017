describe('Kiểm tra khi ngày tháng nhỏ hơn ngày tháng hiện tại', function() {
	beforeEach(function() {
		cy.visit('signin');
		cy.get('body > div > div.login.ng-scope > div.content > form > button').click();
        cy.wait(500);
	});
	var currentDate = new Date();
	var dateToType = (currentdate.getDate() - 1) + '/' + (currentdate.getMonth()) + '/' + currentdate.getFullYear()
	it('Đến trang quản lý bệnh nhân', function() {

		cy.contains('Quản lý bệnh nhân').click();
    	cy.wait(500);

    	//chọn button Nâng cao

    	cy.get('button.btn blue-custom btn-sm ng-binding').click();
    	cy.wait(500);

    	//chon muc ngay sinh va nhap dateToType
    	cy.get('input[name=admission_date_to]').type(dateToType).blur();
    	cy.get('div').should('contain', 'Ngày tháng được nhập không được phép nhỏ hơn ngày hiện tại!')

	})
})