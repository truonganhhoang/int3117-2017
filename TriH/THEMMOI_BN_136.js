describe('THEMMOI_BN', function() {

	beforeEach(function(){ //Đăng nhập và chuyển tới trang thêm bệnh nhân

		cy

			.visit("http://52.187.8.102/signin")

			.get("input[name='email']").type("admin_agency_10@gmail.com")

			.get("input[name='password']").type("Methadone@2017").type("{enter}")

			.visit("http://52.187.8.102/main/patients/new")

	})

	context("THEMMOI_BN_136", function(){
		//Kiểm tra thông báo khi ngày cấp > ngày hiện tại
		it("Ngày cấp > Ngày hiện tại",function(){

			cy
				// Nhập ngày cấp > hiện tại 1 ngày
				.get("div[class='form-group']").contains("Ngày cấp").parent().within(function(){

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
				//Lưu
				.get("button").contains("Lưu").click()

				.wait(3000)
				// Kiểm tra thông báo lỗi có hiển thị không
				.get("label").contains("Ngày cấp").parent().within(function(){

					cy.get(".text-error").should("not.have.css","display","none")

				})
				// Kiểm tra thông báo lỗi đã đúng chưa
				.get("label").contains("Ngày cấp").parent().within(function(){

						cy.get(".text-error").should("contain","Vui lòng nhập ngày nhỏ hơn ngày hiện tại")

					})

		})

	})

})