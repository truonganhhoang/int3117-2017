const time = 2000
describe("kiem tra email sai ding dang", function(){
	describe("Dang nhap", function(){
		it("dang nhap voi tai khoan admin", function(){
			cy.visit('/signin')
			cy.get("input[name=email]").type('admin_10@gmail.com')
			cy.get("input[name=password]").type('Methadone@2017')
			cy.get("button[type=submit]").click()
		})
	})
	describe("quan ly nguoi dung", function(){
		it("click nut +Thêm", function(){
			cy.wait(time)
			cy.visit("/main/admin/administrators")
			cy.get("a.btn.blue-custom.btn-sm.ng-binding").click()
		})


		it('Nhap email sai dinh dang', function() {
		    cy.wait(time)
		    cy.get('input[type=email]').type('abcabc@gmailcom')
		    cy.get('input[name=password]').type('123456a!')
		    cy.get('input[name=first_name]').type('Nguyen')
		    cy.get('input[name=last_name]').type('Tuan')
		    cy.get('a.select2-choice.ui-select-match.ng-scope').click()
		    cy.get("ul.select2-result-single > li").eq(8).click()
		    cy.get('button.btn.blue-custom.btn-sm.ng-binding').click()
			
			cy.get('div.ng-binding.ng-scope').should(($loi) => {
            	expect($loi).to.contain('Email không đúng định dạng.')
			})
        	cy.get('input[type=email]').clear()
		    
      	})
		it('Nhap email sai dinh dang', function() {
		    cy.wait(time)
		    cy.get('input[type=email]').type('abcabcgmail.com')			
			cy.get('div.ng-binding.ng-scope').should(($loi) => {
            	expect($loi).to.contain('Email không đúng định dạng.')
			})
        	cy.get('input[type=email]').clear()		    
      	})

		it('Nhap email sai dinh dang', function() {
		    cy.wait(time)
		    cy.get('input[type=email]').type('abcabc@gmail.')		    
			cy.get('div.ng-binding.ng-scope').should(($loi) => {
            	expect($loi).to.contain('Email không đúng định dạng.')
			})

      	})
	})
})
			
