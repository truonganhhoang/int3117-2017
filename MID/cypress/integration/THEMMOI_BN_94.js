var delay = 1000;
describe('Kiểm tra combo-box "Tỉnh/Thành phố tạm trú"', function () {
  it('Đăng nhập...', function () {
    cy.fixture('users').then((user) =>{
      cy.visit('/signin');
      cy.get('input[name=email]').type(user.doctor.email);
      cy.get('input[name=password]').type(user.doctor.password);
      cy.get('button[type=submit]').click();
      cy.wait(delay);
  		})
  	})

  it('Thêm bệnh nhân...', function () {
    cy.get('li.nav-item > a[ui-sref="main.patients"]').click().wait(1000);
    cy.get('a.btn[href="/main/patients/new"]').click().wait(1000);
    cy.contains('div.portlet', 'Thông tin chi tiết').should('visible');
  })
  it('Test', function() {
    var ele = cy.get("label").contains("Tỉnh/Thành phố tạm trú").next().next();
    ele.click();
    cy.get('li[role="option"] > div > span').should('have.css', 'text-align', 'left');
  })
})