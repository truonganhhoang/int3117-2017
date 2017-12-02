var delay = 1000;
describe('Themmoi_BN_94', function () {
  it('Dang nhap bang tai khoan doctor', function () {
    cy.fixture('users').then((user) =>{
      cy.visit('/signin');
      cy.get('input[name=email]').type(user.doctor.email);
      cy.get('input[name=password]').type(user.doctor.password);
      cy.get('button[type=submit]').click();
      cy.wait(delay);
  	})
  })

  it('Thêm bệnh nhân', function () {
    cy.get('li.nav-item > a[ui-sref="main.patients"]').click().wait(1000);
    cy.get('a.btn[href="/main/patients/new"]').click().wait(1000);
    cy.contains('div.portlet', 'Thông tin chi tiết').should('visible');
  })
  it('Kiểm tra can le', function() {
    var ele = cy.get("label").contains("Tỉnh/Thành phố tạm trú").next().next();
    ele.click();
    cy.get('li[role="option"] > div > span').should('have.css', 'text-align', 'left');
  })
})