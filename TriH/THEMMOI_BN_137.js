describe('THEMMOI_BN', function() {

	beforeEach(function(){ //Đăng nhập và chuyển tới trang thêm bệnh nhân

		cy

			.visit("http://52.187.8.102/signin")

			.get("input[name='email']").type("admin_agency_10@gmail.com")

			.get("input[name='password']").type("Methadone@2017").type("{enter}")

			.visit("http://52.187.8.102/main/patients/new")

	})

	context("THEMMOI_BN_137", function(){
		//Kiểm tra thông báo khi ngày cấp nhỏ hơn ngày sinh
		it("Ngày cấp < Ngày sinh", function(){

			cy
				//Nhập ngày cấp
				.get("div[class='form-group']").contains("Ngày cấp").parent().within(function(){

					cy.root().get(".ng-empty").focus().type("01/01/2012")

				})
				//Nhập ngày sinh
				.get("input[name='admission_date']").focus().type("01/01/2013")
				//Lưu
				.get("button").contains("Lưu").click()

				.wait(3000)
				// Kiểm tra thông báo lỗi có hiển thị không
				.get("label").contains("Ngày cấp").parent().within(function(){

					cy.get(".text-error").should("not.have.css","display","none")

				})
				// Kiểm tra thông báo lỗi đã đúng chưa
				.get("label").contains("Ngày cấp").parent().within(function(){

						cy.get(".text-error").should("contain","Vui lòng nhập ngày lớn hơn ngày sinh")

				})

		})

	})


})