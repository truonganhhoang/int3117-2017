describe('Kiểm tra khi trường Từ ngày bằng trường Đến ngày', function() {
	beforeEach(function() {
		cy.visit('signin');
		cy.get('body > div > div.login.ng-scope > div.content > form > button').click();
        cy.wait(500);
	});
	var fromDate = '20/9/2017';
	var toDate = '20/9/2017';
	it('Đến trang Báo cáo tổng hợp', function() {

		cy.contains('Báo cáo tổng hợp').click();
    	cy.wait(500);

    	//chọn button Nâng cao

    	cy.get('body > div > div:nth-child(3) > div.page-sidebar-wrapper > div.page-content-wrapper > div.page-content > div.ng-scope > div.row.ng-scope > button').click();
    	cy.wait(500);

    	//Nhập fromDate vào ô input Từ ngày
    	cy.get('input[name=from_date]').clear();
    	cy.get('input[name=from_date]').type(fromDate);

    	//Nhập toDate vào ô input Đến ngày
    	cy.get('input[name=to_date]').clear();
    	cy.get('input[name=to_date]').type(toDate);

    	//Click Tạo báo cáo
    	cy.get('button[type=submit]').click();
        cy.get('body > div.report').should('contain', 'Tạo báo cáo tổng hợp thành công');

	})
})