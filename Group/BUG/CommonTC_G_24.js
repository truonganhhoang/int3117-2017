describe('Tìm kiếm không phân biệt chữ hoa, chữ thường', function() {
    var routes = [
        {
            name: "patients",
            column: 3
        },
        {
            name: "administrators",
            column: 2
        },
        {
            name: "issuing_agency",
            column: 3
        },
        {
            name: "employments",
            column: 2
        },
        {
            name: "maritals",
            column: 2
        },
        {
            name: "educations",
            column: 2
        },
        {
            name: "stop_reasons",
            column: 2
        },
        {
            name: "medicine_list",
            column: 2
        },
        {
            name: "manufacturers",
            column: 2
        },
        {
            name: "providers",
            column: 2
        },
        {
            name: "sources",
            column: 2
        }
    ];

    beforeEach(function() {
        cy.visit(Cypress.env("routes.signin"));
        cy.get('[name="email"]').type(Cypress.env("accounts.admin.email"));
        cy.get('[name="password"]').type(Cypress.env("accounts.admin.password"));
        cy.get('[type="submit"]').click();
        cy.wait(Cypress.env("delays.after_signin"));
    });

    routes.forEach(function(route) {
        it(route.name, function() {
            cy.visit(Cypress.env("routes.main." + route.name));
            cy.wait(Cypress.env("delays.after_visit"));

            // search
            var selector = 'tbody > tr:first-child > td:nth-child(' + route.column + ')';
            cy.get('table').eq(0).find(selector).then(function($td) {
                var text = $td.text().trim();
                cy.get('[ng-model="keyword"]').type(text.toUpperCase()).type('{enter}');
                cy.wait(Cypress.env("delays.after_search"));
                cy.get('table').eq(0).find(selector).should('contain', text);
            });
        });
    });
});
