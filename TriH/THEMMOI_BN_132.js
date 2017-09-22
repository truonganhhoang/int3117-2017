describe('THEMMOI_BN', function() {

	beforeEach(function(){

		cy

			.visit("http://52.187.8.102/signin")

			.get("input[name='email']").type("admin_agency_10@gmail.com")

			.get("input[name='password']").type("Methadone@2017").type("{enter}")

			.visit("http://52.187.8.102/main/patients/new")

	})



	context('THEMMOI_BN_132',function(){

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
})