describe('THEMMOI_BN', function() {

	beforeEach(function(){ //Đăng nhập và chuyển tới trang thêm bệnh nhân

		cy

			.visit("http://52.187.8.102/signin")

			.get("input[name='email']").type("admin_agency_10@gmail.com")

			.get("input[name='password']").type("Methadone@2017").type("{enter}")

			.visit("http://52.187.8.102/main/patients/new")

	})

	context('THEMMOI_BN_135',function(){
		// Kiểm tra khi nhập đủ các truong mà không nhập ngày cấp
		it("Nhập đủ các trường nhưng không nhập 'Ngày cấp'", function(){

			cy
				//Nhập các trường bắt buộc
				
					.get("label.required").contains("Họ và tên").parent().within(function(){

						cy.get("input").focus().type("Nguyen Van A")

					})

					.get("input[name='birth_date']").focus().type("01/01/1999{enter}")

					.get("label.required").contains("Giới tính").parent().within(function(){

						cy.get("a").click()					

					})	

					.get("#ui-select-choices-13").find("li").first().click()

					.get("input[name='admission_date']").focus().type("01/11/1999{enter}")

					.get("label.required").contains("Tỉnh/Thành phố thường trú").parent().within(function(){

						cy.get("a").click()					

					})	

					.get("#ui-select-choices-19").find("li").first().click()

					.get("label.required").contains("Huyện/Quận thường trú").parent().within(function(){

						cy.get("a").click()					

					})	

					.get("#ui-select-choices-20").find("li").first().click()

					.get("label.required").contains("Xã/Thị Trấn thường trú").parent().within(function(){

						cy.get("a").click()					

					})	

					.get("#ui-select-choices-21").find("li").first().click()

					.get("label.required").contains("Tỉnh/Thành phố tạm trú").parent().within(function(){

						cy.get("a").first().click()					

					})

					.get("label.required").contains("Huyện/Quận tạm trú").parent().within(function(){

						cy.get("a").click()					

					})	

					.get("#ui-select-choices-23").find("li").first().click()

					.get("label.required").contains("Xã/Thị Trấn tạm trú").parent().within(function(){

						cy.get("a").click()					

					})	

					.get("#ui-select-choices-24").find("li").first().click()

					.get("label.required").contains("Loại giấy tờ").parent().within(function(){

						cy.get("a").click()					

					})	

					.get("#ui-select-choices-25").find("li").first().click()	

					.get("label.required").contains("Số").parent().within(function(){

						cy.get("input").focus().type("111111111")

					})

					.get("input[name='identification_issued_by']").focus().type("HN")

					.get(".general-item-list").within(function(){

						cy.get("label.required").contains("Họ và tên").parent().within(function(){

							cy.get("input").focus().type("Nguyen Van B")

						})	

					})

					.get("label.required").contains("Mối quan hệ").parent().within(function(){

							cy.get("a").click()

						})

					.get("#ui-select-choices-26").find("li").first().click()
				
				//Lưu
				.get("button").contains("Lưu").click()
				.wait(3000)
				// Kiểm tra thông báo lỗi có hiển thị không
				.get("label.required").contains("Ngày cấp").parent().within(function(){

					cy.get(".text-error").should("not.have.css","display","none")

				})
				// Kiểm tra thông báo lỗi đã đúng chưa
				.get("label.required").contains("Ngày cấp").parent().within(function(){

						cy.get(".text-error").should("contain","Trường này không được để trống.")

				})

		})

	})

})
