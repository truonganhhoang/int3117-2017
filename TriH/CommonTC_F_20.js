describe('CommonTC_F_20', function() {
	it('Test',function(){

		cy

			.visit("http://52.187.8.102/signin")

			.get("input[name='email']").clear().type("admin@gmail.com")

			.get("input[name='password']").type("Methadone@2017").type("{enter}")

			.visit("http://52.187.8.102/main/admin/administrators")

			.get("td[class='ng-binding']").contains("1").parent().within(function(){

					cy.root().get("i[class='fa fa-trash-o']").click()
			})

			.get("button[data-bb-handler='confirm']").click()

	}) 
})
