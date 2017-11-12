describe('Tim kiem', function () {
    context('Kiem tra textbox "Dia chi tam tru"', () => {
        beforeEach(() => {
            cy.fixture('users').then(users => {
                cy.login(users.admin)
            });

            cy.visit('/main/admin/administrators/employments');
        });

        it('Tim kiem theo gia tri mac dinh', () => {
            var total_record = "";
            cy.get('ul[total-items="employments.total"]').next()
                .then(total => {
                    total_record = total.text();

                    cy.get('a[ng-click="search()"]')
                        .click();

                    cy.get('ul[total-items="employments.total"]').next()
                        .should('contain', total_record);
                });
        });

        it('Tim kiem khong ra ket qua', () => {
            cy.get('form[ng-submit="search()"]').find('input').type('67***');
            cy.get('a[ng-click="search()"]')
                .click();

            cy.get('ul[total-items="employments.total"]').next()
                .should('contain', 0);
        });

        it('Tim kiem với nhập kĩ tứ space ở đầu và cuối', () => {
            var total_record = "";
            var imSpaceStr = '    trang    ';
            cy.get('ul[total-items="employments.total"]').next()
                .then(total => {
                    total_record = total.text();
                    cy.get('form[ng-submit="search()"]').find('input').type(imSpaceStr);
                    cy.get('a[ng-click="search()"]')
                        .click();

                    cy.get('ul[total-items="employments.total"]').next()
                        .should('contain', total_record);
                });
        });

        it('Tim kiem với nhập toàn kí tự đặc biệt', () => {
            var test = ">";
            cy.get('form[ng-submit="search()"]').find('input').type(test);
            cy.get('a[ng-click="search()"]')
                .click();
            cy.get('table').find('tr').should(($data) => {
                expect($data).to.contain(test);
            });
        });


    })
});
