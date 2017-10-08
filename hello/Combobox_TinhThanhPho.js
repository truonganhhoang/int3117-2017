describe('Combobox_TinhThanhPho', function(){
	beforeEach(function(){
		cy.visit('http://13.76.80.144/signin')

		cy.get('input[name="email"]').type('admin_10@gmail.com')
		cy.get('input[name="password"]').type('Methadone@2017')
		cy.get('button[type="submit"]').click()
		cy.wait(2000)
	})

	it('THEMMOI_BN_62 Kt giá trị mặc định', function(){
		cy.visit('http://13.76.80.144/main/admin/summary_report')

		cy.contains('Tỉnh/Thành phố')
		.parent().within(function(){
			cy.get('span[class="select2-chosen ng-binding"]')
				.should('contain', '-- Chọn Tỉnh/Thành phố --')
		})
	})

	it('THEMMOI_BN_63 KT SL và SX', function(){
		cy.visit('http://13.76.80.144/main/admin/summary_report')

		//open combo box
		cy.contains('Tỉnh/Thành phố')
		.parent().within(function(){
			cy.get('span[class="select2-arrow ui-select-toggle"]').click()
		})
		
		//data
		var listProvince = ['An Giang', 'Bà Rịa - Vũng Tàu',
			'Bạc Liêu', 'Bắc Giang', 'Bắc Kạn', 'Bắc Ninh',
			'Bến Tre', 'Bình Dương', 'Bình Định', 'Bình Phước',
			'Bình Thuận', 'Cao Bằng', 'Cà Mau', 'Đà Nẵng',
			'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai',
			'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam',
			'Hà Nội', 'Hà Tĩnh', 'Hải Dương', 'Hậu Giang',
			'Hòa Bình', 'Hưng Yên', 'Khánh Hòa', 'Kiên Giang',
			'Kom Tum', 'Lai Châu', 'Lào Cai', 'Lạng Sơn',
			'Lâm Đồng', 'Long An', 'Nam Định', 'Nghệ An',
			'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên',
			'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh',
			'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình',
			'Thái Nguyên', 'Thanh Hóa', 'Thành phố Cần Thơ',
			'Thành phố Hải Phòng', 'Thành phố Hồ Chí Minh',
			'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang',
			'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'
		]

		//check data
		cy.get('ul[role="listbox"][class="select2-result-single"][id="ui-select-choices-1"]')
			.get('li[role="option"]').should(function($p){
				expect($p).to.have.length(63)

				var datas = $p.map(function(i, el){
					return Cypress.$(el).text()
				})

				expect(datas.get()).to.deep.eq(listProvince)
			})
	})

	it('THEMMOI_BN_64 KT căn lề trái', function(){
		cy.visit('http://13.76.80.144/main/admin/summary_report')
		
		//open combo box
		cy.contains('Tỉnh/Thành phố')
		.parent().within(function(){
			cy.get('span[class="select2-arrow ui-select-toggle"]').click()
		})

		//check align
		cy.get('ul[role="listbox"][class="select2-result-single"][id="ui-select-choices-1"]')
			.should('have.css', 'text-align', 'left')
	})

	it('THEMMOI_BN_65 KT thông tin bắt buộc', function(){
		cy.visit('http://13.76.80.144/main/admin/summary_report')

		cy.get('button[class="btn blue-custom btn-sm"]').click()

		cy.contains('Tỉnh/Thành phố')
		.parent().within(function(){
			cy.get('div[ng-message="required"][class="ng-binding ng-scope"]')
			.should('contain', 'Trường này không được để trống.')
		})
	})

	it("THEMMOI_BN_66 KT chức năng tìm kiếm", function(){
		cy.visit('http://13.76.80.144/main/admin/summary_report')

		// open combo box
		cy.contains('Tỉnh/Thành phố')
		.parent().within(function(){
			cy.get('span[class="select2-arrow ui-select-toggle"]').click()
		})

		cy.get('div[class="ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active"]')
			.find('input[type="search"]').as('search')

		cy.get('@search').type("Bắc")
		cy.wait(2000)
		cy.get('@search').type('{enter}')
	})

})
