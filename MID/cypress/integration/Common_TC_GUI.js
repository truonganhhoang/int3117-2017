describe('CommonTC_GUI', function(){
  beforeEach('Dang nhap', function(){
    cy.fixture('users').then((user) =>{
      cy.visit('/signin');
      cy.get('input[name=email]').type(user.admin.email);
      cy.get('input[name=password]').type(user.admin.password);
      cy.get('button[type=submit]').click();
      cy.wait(400);
      cy.visit('/main/admin/administrators');
      cy.wait(1000);
      cy.get('i.fa.fa-plus').click();
      cy.wait(1000);
    })
  })

   it('CommonTC_G_86', function(){
    cy.get('input[name=email]').should('have.value','');
    cy.get('input[name=password]').should('have.value','');
    cy.get('input[name=first_name]').should('have.value','');
    cy.get('input[name=last_name]').should('have.value','');
    cy.get('span.select2-chosen.ng-binding').should('have.value','');
  })

  it('CommonTC_G_87', function(){
    cy.fixture('admin_account').then((admin) =>{
      cy.get('input[name=email]').type(admin.account.email);
      cy.get('input[name=password]').type(admin.account.password);
      cy.get('input[name=first_name]').type(admin.account.first_name);
      cy.get('input[name=last_name]').type(admin.account.last_name);
      cy.get('li').contains('CSĐT MMT Ba Vì').click();
      cy.get('button').contains('Lưu').click();
      cy.wait(1000);
    })
  })
})
