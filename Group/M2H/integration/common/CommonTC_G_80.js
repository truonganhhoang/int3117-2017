describe('Kiểm tra khi ngày tháng lớn hơn ngày tháng hiện tại', function() {

	// đăng nhập với tài khoản admin
	beforeEach(function() {
        cy.visit("signin")
        cy.get('input[name=email]').type('admin_10@gmail.com')
        cy.get('input[name=password]').type('Methadone@2017{enter}')
        cy.wait(3000)
        cy.visit("main/patients/new")
	});

	// lấy ngày tháng hiện tại
	var currentDate = new Date();

	// ngày tháng hiện tại + 1 ngày
	var dateToType = (currentdate.getDate() + 1) + '/' + (currentdate.getMonth()) + '/' + currentdate.getFullYear()

	// đi đến trang quản lý bệnh nhân
	it('Đến trang quản lý bệnh nhân', function() {

		cy.contains('Quản lý bệnh nhân').click();
    	cy.wait(500);

    	//chọn button Nâng cao

    	cy.get('button.btn blue-custom btn-sm ng-binding').click();
    	cy.wait(500);

    	//Chọn mục ngày sinh và nhập dateToType 
    	cy.get('input[name=birthdate_from]').type(dateToType).blur();
    	cy.get('div').should('contain', 'Ngày tháng được nhập không được phép lớn hơn ngày hiện tại!')

	})
})