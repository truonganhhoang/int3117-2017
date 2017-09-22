describe('THEMMOI_BN', function() {

	beforeEach(function(){ //Đăng nhập và chuyển tới trang thêm bệnh nhân

		cy

			.visit("http://52.187.8.102/signin")

			.get("input[name='email']").type("admin_agency_10@gmail.com")

			.get("input[name='password']").type("Methadone@2017").type("{enter}")

			.visit("http://52.187.8.102/main/patients/new")

	})



	context('THEMMOI_BN_132',function(){
		//Thêm ngày vào trường "Ngày cấp"
		beforeEach(function(){

			cy.get("input[name='identification_issued_date']")

			.type("25/12/2012").type("{enter}")

		})
		//Kiểm tra xem Calendar có focus đúng ngày đã nhập không
		it("Kiểm tra Calendar", function(){ 

			cy
				// Mở Calendar
				.get("div[class='form-group']").contains("Ngày cấp").parent().within(function(){

					cy.root().get("i[class='fa fa-calendar']").click()

				})
				//Kiểm tra tháng năm
				.get("th[class='datepicker-switch']").should("contain","December 2012") 
				//Kiểm tra ngày
				.get("td.active.day").should("contain","25") 

		})

		})
})