describe('THEMMOI_BN', function() {

	beforeEach(function(){

		cy

			.visit("http://52.187.8.102/signin")

			.get("input[name='email']").type("admin_agency_10@gmail.com")

			.get("input[name='password']").type("Methadone@2017").type("{enter}")

			.visit("http://52.187.8.102/main/patients/new")

	})

	context('THEMMOI_BN_134',function(){

		it("fill date", function(){

			cy

				.get("div[class='form-group']").contains("Ngày cấp").parent().within(function(){

					cy.root().get(".ng-empty").focus().type("12/12/122{enter}")// ko co lenh {tab}

						

				})
				.get("label").contains("Ngày cấp").parent().within(function(){

					cy.get(".text-error").should("not.have.css","display","none")

				})
				.get("label").contains("Ngày cấp").parent().within(function(){

					cy.get(".text-error").should("contain","Ngày tháng không đúng định dạng")
				})
				

		})

	})

})