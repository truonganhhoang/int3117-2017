Cypress.Commands.add('login', user => {
    cy.visit('/signin')
        .get('input[name=email]').type(user.email)
        .get('input[name=password]').type(user.password + '{enter}')
        .wait(1000) //Make sure load all data into browser (Can ignore)
});

Cypress.Commands.add('mySelect', (element, value) => {
    cy.get(element).filter('div[required="required"]').click() //Find element and expand option
        .find('li[role="option"]').contains(value).click()
});