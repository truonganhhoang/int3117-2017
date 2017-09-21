describe('THEMMOI_BN', function() {
	beforeEach(function(){
		cy
			.visit("http://52.187.8.102/signin")
			.get("input[name='email']").type("admin_agency_10@gmail.com")
			.get("input[name='password']").type("Methadone@2017").type("{enter}")
			.visit("http://52.187.8.102/main/patients/new")

	})

/*	context('THEMMOI_BN_132',function(){
		beforeEach(function(){
			cy.get("input[name='identification_issued_date']")
			.type("25/12/2012").type("{enter}")
		})
		it("click calender", function(){
			cy
				.get("div[class='form-group']").contains("Ngày cấp").parent().within(function(){
					cy.root().get("i[class='fa fa-calendar']").click()
				})
				.get("th[class='datepicker-switch']").should("contain","December 2012")
				.get("td.active.day").should("contain","25")

		})
		})

	context('THEMMOI_BN_133',function(){
		it("pick date", function(){
			cy
				.get("div[class='form-group']").contains("Ngày cấp").parent().within(function(){
					cy.root().get("i[class='fa fa-calendar']").click()
				})
				.get("div.datepicker-days").find("td.today.day").prev().click()
				.get("div").should("not.have.class","datepicker-days") //Kiem tra calendar co dong hay khong
				.get("div[class='form-group']").contains("Ngày cấp").parent().within(function(){
					cy.root().get("input.ng-not-empty").click()
				})
				.get("div.datepicker-days").find("td.active.day").next().should("have.class","today day")

		})
	})

	//Not Running
	context('THEMMOI_BN_134',function(){
		it("fill date", function(){

			cy

				.get("div[class='form-group']").contains("Ngày cấp").parent().within(function(){
					cy.root().get(".ng-empty").focus().type("12/12/122{enter}")// ko co lenh {tab}
						
				})
				.document().should.have.attr("Ngày cấp")
		})
	})
*/
	
/*	context('THEMMOI_BN_135',function(){
		it("no fill date", function(){
			cy
				.get("label").contains("Họ và tên").parent().within(function(){
					cy.get("input").focus().type("Nguyen Van A")
				})
				.get("input[name='birth_date']").focus().type("01/01/1999{enter}")
				.get("label").contains("Giới tính").parent().within(function(){
					cy.get("a").click()					
				})	
				.get("#ui-select-choices-13").find("li").first().click()
				.get("input[name='admission_date']").focus().type("01/11/1999{enter}")
				.get("label").contains("Tỉnh/Thành phố thường trú").parent().within(function(){
					cy.get("a").click()					
				})	
				.get("#ui-select-choices-19").find("li").first().click()
				.get("label").contains("Huyện/Quận thường trú").parent().within(function(){
					cy.get("a").click()					
				})	
				.get("#ui-select-choices-20").find("li").first().click()
				.get("label").contains("Xã/Thị Trấn thường trú").parent().within(function(){
					cy.get("a").click()					
				})	
				.get("#ui-select-choices-21").find("li").first().click()
				.get("label").contains("Tỉnh/Thành phố tạm trú").parent().within(function(){
					cy.get("a").first().click()					
				})
				.get("label").contains("Huyện/Quận tạm trú").parent().within(function(){
					cy.get("a").click()					
				})	
				.get("#ui-select-choices-23").find("li").first().click()
				.get("label").contains("Xã/Thị Trấn tạm trú").parent().within(function(){
					cy.get("a").click()					
				})	
				.get("#ui-select-choices-24").find("li").first().click()
				.get("label").contains("Loại giấy tờ").parent().within(function(){
					cy.get("a").click()					
				})	
				.get("#ui-select-choices-25").find("li").first().click()	
				.get("label").contains("Số").parent().within(function(){
					cy.get("input").focus().type("111111111")
				})
				.get("input[name='identification_issued_by']").focus().type("HN")
				.get(".general-item-list").within(function(){
					cy.get("label").contains("Họ và tên").parent().within(function(){
						cy.get("input").focus().type("Nguyen Van B")
					})	
				})
				.get("label").contains("Mối quan hệ").parent().within(function(){
						cy.get("a").click()
					})
				.get("#ui-select-choices-26").find("li").first().click()
				.get("button").contains("Lưu").click()
				.get("label").contains("Ngày cấp").parent().within(function(){
						cy.get(".text-error").should("contain","Trường này không được để trống.")
					})

		})
	})
*/


})
