describe('THEMMOI_BN', function() {

	beforeEach(function(){ //Đăng nhập và chuyển tới trang thêm bệnh nhân

		cy

			.visit("http://52.187.8.102/signin")

			.get("input[name='email']").type("admin_agency_10@gmail.com")

			.get("input[name='password']").type("Methadone@2017").type("{enter}")

			.visit("http://52.187.8.102/main/patients/new")

	})

	context('THEMMOI_BN_133',function(){
		//Kiểm tra chọn từ Calendar có đúng không
		it("Chọn ngày", function(){

			cy
				// Mở Calendar
				.get("div[class='form-group']").contains("Ngày cấp").parent().within(function(){

					cy.root().get("i[class='fa fa-calendar']").click()

				})
				//Chọn ngày
				.get("div.datepicker-days").find("td.today.day").prev().click()
				// Kiểm tra Calendar đã đóng chưa
				.get("div").should("not.have.class","datepicker-days") 
				//Kiểm tra ngày có đúng như đã chọn không
				.get("div[class='form-group']").contains("Ngày cấp").parent().within(function(){

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

	})
})