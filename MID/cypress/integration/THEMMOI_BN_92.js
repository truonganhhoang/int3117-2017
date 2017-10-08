var delay = 1000;
describe('Common_TC_G_92', function(){
  it('Vao common_test', function(){
    cy.fixture('users').then((user) =>{
      cy.visit('/signin');
      cy.get('input[name=email]').type(user.doctor.email);
      cy.get('input[name=password]').type(user.doctor.password);
      cy.get('button[type=submit]').click();
      cy.wait(delay);
      cy.visit('/common_test')
  	})
  })

  it('Kiem tra gia tri mac dinh', function(){
  	cy.get('body > div > div > div.portlet-body > div > div:nth-child(2) > form > div > div:nth-child(5) > div > div > a').should('have.attr','placeholder','-- Vui lòng chọn --')
  })

})