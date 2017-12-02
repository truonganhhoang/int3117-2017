describe("Kiem tra thuc hien chuc nang chinh cua man hinh khi nhan Enter", function () {

    it('Dang nhap', function () {

        cy.visit(Cypress.env('URL_LOGIN'));
    	cy.get('input[name=email]').type(Cypress.env('USER_AGENCY'));
    	cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'));
    	cy.get('button[type=submit]').click();
    });

    it('Truy cap trang them moi benh nhan', function () {

        cy.get('.page-sidebar-menu .nav-item').contains('Quản lý bệnh nhân').click();
        cy.get('.inputs a').should('have.attr', 'href', '/main/patients/new').click();
    });

    it('Click khi khong focus vao input nao', function () {
        cy.get('body').type('{enter}');
    });

    it('Click khi focus vao 1 input', function () {
        cy.get('input[name=name]:first').type('{enter}');
    })
});
