/**
 * Created by locdt on 07/10/2017.
 */
Cypress.Commands.add('typeNumber', function(selector, value) {
	return cy.get(selector).clear().type(value + '{enter}');
});

Cypress.Commands.add('doActions', function(actions) {
	if (actions != undefined && actions.length > 0)
		actions.forEach(action => {
			switch (action.type) {
				case "select":
					cy.doSelect2(action.selector, action.value);
					break;
				case "input":
					if (action.value == undefined)
						cy.doRandInt(5, 10).then(length => {
							cy.randomString(length).then(str => {
								cy.get(action.selector).type(str);
							});
						});
					else
						cy.get(action.selector).type(action.value);
					
					
					break;
				case "check":
					cy.mtCheckbox(action.selector, action.checked);
					break;
			}
		});
});

Cypress.Commands.add('assert', function(assertion) {
	console.log(assertion);
	switch (assertion.assert) {
		case "contain":
			cy.get('body').should(assertion.assert, assertion.data);
			break;
		default:
			if (assertion.data == undefined)
				cy.get(assertion.selector).should(assertion.assert);
			else
				cy.get(assertion.selector).should(assertion.assert, assertion.data);
			break;
	}
});

Cypress.Commands.add('prepareFormData', function(form, input) {
	// Điền trước các input cần thiết
	cy.doActions(form.action);
	
	// Điền các input tùy theo từng testcase
	cy.doActions(input.action);
});