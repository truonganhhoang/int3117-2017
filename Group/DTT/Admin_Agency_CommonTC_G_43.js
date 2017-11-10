const time = 1000
describe("kiem tra email thua dau cach", function(){
	describe("Dang nhap", function(){
		it("dang nhap voi tai khoan admin", function(){
			cy.visit('/signin')
			cy.get("input[name=email]").type('admin_agency_10@gmail.com')
			cy.get("input[name=password]").type('Methadone@2017')
			cy.get("button[type=submit]").click()
		})
	})
	describe("quan ly nguoi dung", function(){
		it("click nut +Thêm", function(){
			cy.wait(time)
			cy.visit("/main/admin_agency/users")
			cy.wait(time)
			cy.get("a.btn.blue-custom.btn-sm.ng-binding").click()
		})


		it('Nhap email hop le nhung co space o dau va cuoi', function() {
		    cy.wait(time)
		    cy.get('input[type=email]').type(' acabc@gmail.com ')
		    cy.get('input[name=password]').type('123456a!')
		    
		    cy.get('a.select2-choice.ui-select-match.ng-scope').click()
		    cy.get("ul.select2-result-single > li").eq(0).click()
		    cy.get('button.btn.blue-custom.btn-sm.ng-binding').click()
			
      		})

	})
})
			
