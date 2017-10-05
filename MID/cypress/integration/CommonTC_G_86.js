var delay = 1000;
describe('Common_TC_G_86', function(){
  it('Dang nhap', function(){
    cy.fixture('users').then((user) =>{
      cy.visit('/signin');
      cy.get('input[name=email]').type(user.admin.email);
      cy.get('input[name=password]').type(user.admin.password);
      cy.get('button[type=submit]').click();
      cy.wait(delay);
    })
  })

it('Vào trang quản lý tài khoản', function(){
    cy.get('body > div > div.page-container.ng-scope > div > div.page-sidebar.navbar-collapse.collapse > ul > li:nth-child(3) > a > i').click();
    cy.wait(delay)
    cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.portlet-title > div.inputs > a > i').click();
    cy.wait(delay)
})
it('kiểm tra giá trị mặc định', function(){
  cy.get('input[name=email]').should('have.value','');
  cy.get('input[name=password]').should('have.value','');
  cy.get('input[name=first_name]').should('have.value','');
  cy.get('input[name=last_name').should('have.value','');
  cy.get('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > form > div.modal-body > div > div:nth-child(5) > div.ui-select-container.select2.select2-container.ng-pristine.ng-untouched.ng-scope.ng-empty.ng-invalid.ng-invalid-required > a').should('have.attr','placeholder','-- Vui lòng chọn --');
 })
 
})
