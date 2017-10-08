
describe('GUI Testing: Check spelling for buttons' , function() {
	var testcases = ['Danh mục nghề nghiệp', 'Danh mục hôn nhân', 'Danh mục tài chính', 
					 'Danh mục trình độ học vấn', 'Danh mục lý do ngừng điều trị', 'Danh mục thuốc', 
					 'Danh mục nhà sản xuất', 'Danh mục nhà phân phối', 'Danh mục nguồn thuốc', 'n l'];

	it('Login button', function() {
		cy.visit(Cypress.env('URL_LOGIN'))

		cy.get('.content button').should('contain', 'Đăng nhập')

		cy.get('input[name=email]').type('admin_10@gmail.com')
		cy.get('input[name=password]').type('Methadone@2017{enter}')

	})

	it('Sidebar', function() {
		cy.get('.sidebar-toggler').click()

		cy.get('.icon-home + span').should('contain', 'Trang chủ')

		cy.get('.fa-user-md + span').should('contain', 'Quản lý người dùng')
		cy.get('.fa-sitemap + span').should('contain', 'Quản lý cơ sở')
		cy.get('.icon-folder + span').should('contain', 'Quản lý danh mục')
		cy.get('.icon-users + span').should('contain', 'Quản lý bệnh nhân')
		cy.get('.icon-book-open + span').should('contain', 'Báo cáo tổng hợp')

		cy.get('.icon-folder + span').click()
		cy.get('ul.sub-menu > li').each(function($el, index, $list){ 
			  if (index < 9) {
			  	cy.wrap($el).should('contain', testcases[index])
			  }	  
			})
	})

	it('Buttons', function() {
		cy.clearCookies()

		cy.visit(Cypress.env('URL_LOGIN'))

		cy.get('input[name=email]').type('admin_10@gmail.com')
		cy.get('input[name=password]').type('Methadone@2017{enter}')
		cy.get('.sidebar-toggler').click()

		cy.get('.fa-user-md + span').click()
		cy.wait(1234)
		cy.get('.blue-custom').should('contain', 'Thêm')

		cy.get('.fa-sitemap + span').click()
		cy.wait(1234)
		cy.get('.blue-custom').should('contain', 'Thêm')

		cy.visit(Cypress.env('URL_SAMPLE_PATIENT'))
		cy.get('.blue-custom').should('contain', 'Nâng cao')

		cy.visit(Cypress.env('URL_REPORT'))
		cy.get('.blue-custom').should('contain', 'Tạo báo cáo')
	})
})