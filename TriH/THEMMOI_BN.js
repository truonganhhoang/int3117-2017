describe('THEMMOI_BN', function() {
	context("Kiểm tra trường 'Ngày cấp'", function(){
		// Đăng nhập và chuyển tới trang thêm bệnh nhân
		beforeEach(function(){ 
			
			cy			
				.visit(Cypress.env('sign'))

				.get("input[name='email']").type("admin_agency_10@gmail.com")

				.get("input[name='password']").type("Methadone@2017").type("{enter}")			

				.visit(Cypress.env('newPatient'))

		})

		// Kiểm tra xem Calendar có focus đúng ngày đã nhập không
		it("THEMMOI_BN_132_Kiểm tra Calendar", function(){ 

			cy
				.get("input[name='identification_issued_date']")

				.type("25/12/2012").type("{enter}")
				// Mở Calendar
				.get("label.required").contains("Ngày cấp").parent().within(function(){

					cy.root().get("i[class='fa fa-calendar']").click()

				})
				// Kiểm tra tháng năm
				.get("th[class='datepicker-switch']").should("contain","December 2012") 
				// Kiểm tra ngày
				.get("td.active.day").should("contain","25") 

		})

		// Kiểm tra chọn từ Calendar có đúng không
		it("THEMMOI_BN_133_Chọn ngày", function(){

			cy
				// Mở Calendar
				.get("label.required").contains("Ngày cấp").parent().as("ngayCap").within(function(){

					cy.root().get("i[class='fa fa-calendar']").click()

				})
				// Chọn ngày
				.get("div.datepicker-days").find("td.today.day").prev().click()
				// Kiểm tra Calendar đã đóng chưa
				.get("div").should("not.have.class","datepicker-days") 
				// Kiểm tra ngày có đúng như đã chọn không
				.get("@ngayCap").within(function(){

					var now = new Date();

					var date = now.getDate()-1;

					var month = now.getMonth() + 1;

					var st_date = date.toString();

					var st_month = month.toString();

					if(date < 10) st_date = "0" + st_date;

 					if(month < 10) st_month = "0" + st_month;

					var date_pick = st_date + "/" + st_month + "/" + now.getFullYear().toString();

					cy.root().get("input.ng-not-empty").should("have.value",date_pick);

				})



		})

		// Kiểm tra thông báo khi nhập ngày sai định dạng
		it("THEMMOI_BN_134_Nhập ngày sai định dạng", function(){

			cy
				// Nhập ngày sai định dạng
				.get("label.required").contains("Ngày cấp").parent().as("ngayCap").within(function(){

					cy.root().get(".ng-empty").focus().type("12/12/122{enter}")// ko co lenh {tab}, dung tam {enter}

						

				})
				.get("button").contains("Lưu").click()
				.wait(3000)
				// Kiểm tra thông báo lỗi có hiển thị không
				.get("@ngayCap").within(function(){

					cy.get(".text-error").should("not.have.css","display","none")

				})
				// Kiểm tra thông báo lỗi đã đúng chưa
				.get("@ngayCap").within(function(){

					cy.get(".text-error").should("contain","Ngày tháng không đúng định dạng")
				})
				

		})
		
		// Kiểm tra khi nhập đủ các truong mà không nhập ngày cấp
		it("THEMMOI_BN_135_Nhập đủ các trường nhưng không nhập 'Ngày cấp'", function(){

			cy
				// Nhập các trường bắt buộc
				
					.get("label.required").as('label').contains("Họ và tên").parent().within(function(){

						cy.get("input").focus().type("Nguyen Van A")

					})

					.get("input[name='birth_date']").focus().type("01/01/1999{enter}")

					.get("@label").contains("Giới tính").parent().within(function(){

						cy.get("a").click()					

					})	

					.get("#ui-select-choices-13").find("li").first().click()

					.get("input[name='admission_date']").focus().type("01/11/1999{enter}")

					.get("@label").contains("Tỉnh/Thành phố thường trú").parent().within(function(){

						cy.get("a").click()					

					})	

					.get("#ui-select-choices-19").find("li").first().click()

					.get("@label").contains("Huyện/Quận thường trú").parent().within(function(){

						cy.get("a").click()					

					})	

					.get("#ui-select-choices-20").find("li").first().click()

					.get("@label").contains("Xã/Thị Trấn thường trú").parent().within(function(){

						cy.get("a").click()					

					})	

					.get("#ui-select-choices-21").find("li").first().click()

					.get("@label").contains("Tỉnh/Thành phố tạm trú").parent().within(function(){

						cy.get("a").first().click()					

					})

					.get("@label").contains("Huyện/Quận tạm trú").parent().within(function(){

						cy.get("a").click()					

					})	

					.get("#ui-select-choices-23").find("li").first().click()

					.get("@label").contains("Xã/Thị Trấn tạm trú").parent().within(function(){

						cy.get("a").click()					

					})	

					.get("#ui-select-choices-24").find("li").first().click()

					.get("@label").contains("Loại giấy tờ").parent().within(function(){

						cy.get("a").click()					

					})	

					.get("#ui-select-choices-25").find("li").first().click()	

					.get("@label").contains("Số").parent().within(function(){

						cy.get("input").focus().type("111111111")

					})

					.get("input[name='identification_issued_by']").focus().type("HN")

					.get(".general-item-list").within(function(){

						cy.get("@label").contains("Họ và tên").parent().within(function(){

							cy.get("input").focus().type("Nguyen Van B")

						})	

					})

					.get("@label").contains("Mối quan hệ").parent().within(function(){

							cy.get("a").click()

						})

					.get("#ui-select-choices-26").find("li").first().click()
				
				// Lưu
				.get("button").contains("Lưu").click()
				.wait(3000)
				// Kiểm tra thông báo lỗi có hiển thị không
				.get("@label").contains("Ngày cấp").parent().as("ngayCap").within(function(){

					cy.get(".text-error").should("not.have.css","display","none")

				})
				// Kiểm tra thông báo lỗi đã đúng chưa
				.get("@ngayCap").within(function(){

						cy.get(".text-error").should("contain","Trường này không được để trống.")

				})

		})
		
		// Kiểm tra thông báo khi ngày cấp > ngày hiện tại
		it("THEMMOI_BN_136_Ngày cấp > Ngày hiện tại",function(){

			cy
				// Nhập ngày cấp > hiện tại 1 ngày
				.get("label.required").contains("Ngày cấp").parent().as("ngayCap").within(function(){

					var now = new Date();

					var date = now.getDate() + 1;

					var month = now.getMonth() + 1;

					var st_date = date.toString();

					var st_month = month.toString();

					if(date < 10) st_date = "0" + st_date;

 					if(month < 10) st_month = "0" + st_month;

					var date_pick = st_date + "/" + st_month + "/" + now.getFullYear().toString();

					cy.root().get(".ng-empty").focus().type(date_pick)// ko co lenh {tab}		

				})
				// Lưu
				.get("button").contains("Lưu").click()

				.wait(3000)
				// Kiểm tra thông báo lỗi có hiển thị không
				.get("@ngayCap").within(function(){

					cy.get(".text-error").should("not.have.css","display","none")

				})
				// Kiểm tra thông báo lỗi đã đúng chưa
				.get("@ngayCap").within(function(){

						cy.get(".text-error").should("contain","Vui lòng nhập ngày nhỏ hơn ngày hiện tại")

					})

		})
		// Kiểm tra thông báo khi ngày cấp nhỏ hơn ngày sinh
		it("THEMMOI_BN_137_Ngày cấp < Ngày sinh", function(){

			cy
				// Nhập ngày cấp
				.get("label.required").contains("Ngày cấp").parent().as("ngayCap").within(function(){

					cy.root().get(".ng-empty").focus().type("01/01/2012")

				})
				// Nhập ngày sinh
				.get("input[name='birth_date']").focus().type("01/01/2013")
				// Lưu
				.get("button").contains("Lưu").click()

				.wait(3000)
				// Kiểm tra thông báo lỗi có hiển thị không
				.get("@ngayCap").within(function(){

					cy.get(".text-error").should("not.have.css","display","none")

				})
				// Kiểm tra thông báo lỗi đã đúng chưa
				.get("@ngayCap").within(function(){

						cy.get(".text-error").should("contain","Vui lòng nhập ngày lớn hơn ngày sinh")

				})

		})


	})



})
