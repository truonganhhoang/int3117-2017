// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

    Cypress.Commands.add("login", (user) => {
        cy.get("input[name='email']").type(user.email)
        .get("input[name='password']").type(user.password + '{enter}')

        cy.url().should('not.include', '/signin')
    });

    Cypress.Commands.add("doSelect2", function(selector, value) {
        cy.get(selector).first().click()
        .find('li[role="option"]').contains(value).first().click()
    })

    Cypress.Commands.add("doType", function(selector, value) {
        cy.get(selector).first().type(value)
    })
