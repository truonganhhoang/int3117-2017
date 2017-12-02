describe('CommonTC_F_21', function() {
	it('CommonTC_F_21 xoa ban ghi co rang buoc',function(){

		cy

			.visit(Cypress.env('sign'))
			.get("input[name='email']").clear().type("admin@gmail.com")

			.get("input[name='password']").type("Methadone@2017").type("{enter}")

			.visit(Cypress.env('issuing_agency'))

			.get("td[class='ng-binding']").contains("10118").parent().within(function(){

					cy.root().get("i[class='fa fa-trash-o']").click()
			})

			.get("button[data-bb-handler='confirm']").click()

	}) 
})
