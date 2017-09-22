describe('THEMMOI_BN', function() {

	beforeEach(function(){ //Đăng nhập và chuyển tới trang thêm bệnh nhân

		cy

			.visit("http://52.187.8.102/signin")

			.get("input[name='email']").type("admin_agency_10@gmail.com")

			.get("input[name='password']").type("Methadone@2017").type("{enter}")

			.visit("http://52.187.8.102/main/patients/new")

	})

	context('THEMMOI_BN_134',function(){
		// Kiểm tra thông báo khi nhập ngày sai định dạng
		it("Nhập ngày sai định dạng", function(){

			cy
				//Nhập ngày sai định dạng
				.get("div[class='form-group']").contains("Ngày cấp").parent().within(function(){

					cy.root().get(".ng-empty").focus().type("12/12/122{enter}")// ko co lenh {tab}, dung tam {enter}

						

				})
				// Kiểm tra thông báo lỗi có hiển thị không
				.get("label").contains("Ngày cấp").parent().within(function(){

					cy.get(".text-error").should("not.have.css","display","none")

				})
				// Kiểm tra thông báo lỗi đã đúng chưa
				.get("label").contains("Ngày cấp").parent().within(function(){

					cy.get(".text-error").should("contain","Ngày tháng không đúng định dạng")
				})
				

		})

	})

})