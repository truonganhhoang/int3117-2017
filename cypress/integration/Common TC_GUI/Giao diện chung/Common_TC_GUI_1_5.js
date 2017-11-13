describe('CommonTC_G_1',() => {
	context('kiem tra focus',() => {
		beforeEach(() => {
			cy.fixture('users').then(users => {
				cy.login(users.admin)  
			})
    	})

		var focused = [
			{
				name: 'Nhan vien',
				url:'/main/admin/administrators/employments',
				att:'ng-model',
				value:'keyword'
			},{
				name: 'Tinh trang hon nhan',
				url:'/main/admin/administrators/maritals',
				att:'ng-model',
				value:'keyword'
			},{
				name:'tinh hinh tai chinh',
				url:'/main/admin/administrators/financials',
				att:'ng-model',
				value:'keyword'
			}
		]

		focused.forEach((tc) => {
			it('Kiem tra trang focus '+ tc.name,() => {
				cy.visit(tc.url)
				cy.focused()
				  .should('have.attr', tc.att, tc.value)
			})
		})
	})

	context('General display',() => {
		beforeEach(() => {
      		cy.fixture('users').then(users => {
				cy.login(users.admin)
			})
    	})

    	var man_hinh = [
			{
				url: '/main/dashboard1',
				title: 'Hệ thống quản lý bệnh nhân điều trị bằng thuốc Methadone'
			},
			{
				url: '/main/admin/administrators',
				title: 'Hệ thống quản lý bệnh nhân điều trị bằng thuốc Methadone'
			},
			{
				url: '/main/admin/administrators/issuing_agency',
				title: 'Hệ thống quản lý bệnh nhân điều trị bằng thuốc Methadone'
			}
    	];
    	
		
		it('Kiem tra title man hinh', () => {
			man_hinh.forEach((display) => {
				cy.visit(display.url)
				  .wait(1000)

				cy.title()
				  .should('include',display.title)
			})
		})
		
	})
})
