describe('CommonTC_F_16', function() {
	it('Test',function(){

		cy

			.visit("http://52.187.8.102/signin")

			.get("input[name='email']").clear().type("admin@gmail.com")

			.get("input[name='password']").type("Methadone@2017").type("{enter}")

			.visit("http://52.187.8.102/main/admin/administrators/issuing_agency")

			.get("td[class='ng-binding']").contains("10118").parent().within(function(){

					cy.root().get("i[class='fa fa-trash-o']").click()
			})

	}) 
})
