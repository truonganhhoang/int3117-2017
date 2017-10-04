describe('CommonTC_GUI', function(){
	describe('Dang nhap', function(){
		it('Dang nhap bang tai khoan admin', function(){
			cy.visit('http://13.76.80.144/signin')
			  .get('input[name=email]').type('admin_10@gmail.com')
			  .get('input[name=password]').type('Methadone@2017')
			  .get('button[type=submit]').click()
		})
	})
	describe('Quan ly nguoi dung', function () {
        it('Chuyen trang...', function () {
          cy.get('li.nav-item > a[ui-sref="main.administrators"]').click().wait(1000)
        })
	
	describe('G_89_Kiểm tra việc nhập nhập giá trị Maxlengh', function () {  
        	it('click Them', function () {
            	cy.get('.btn').click().wait(1000)
          	})
        	it('Nhap Email', function () {
            	cy.get('input.ng-valid-email').type('fsdfacdsasawr@gmail.com')
          	})
          	it('Nhap Mat khau', function () {
            	cy.get('input.ng-valid-minlength').type('wwraghdbsvmsbvfsajdhfkaligahglyarehf2/*#')
          	})
          	it('Nhap Ho', function () {
            	cy.get('div.form-group:nth-child(3) > input:nth-child(2)').type('Marki')
          	})
          	it('Nhap Ten', function () {
            	cy.get('div.form-group:nth-child(4) > input:nth-child(2)').type('Hov')
          	})
          	it('Nhap Qu ', function(){
          		cy.get('.select2-arrow > b:nth-child(1)').click()
          		cy.get('.ui-select-choices-row-inner').contains('CSĐT MMT Ba Vì').click()
          	})
          	it('Click Luu', function () {
            	cy.get('button.btn.blue-custom.btn-sm.ng-binding').click()
        		  cy.get('.ng-active > div:nth-child(1)').should(($loi) => {
            		expect($loi).to.contain('Trường này không được quá 30 ký tự.') 
				})
          	})
        })
	})
})