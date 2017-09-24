var homeLink = 'http://13.76.80.144';
var signinLink = homeLink + '/signin';
var newpatientsLink = homeLink + '/main/patients/new';

describe('Kiem_tra_quan_huyen_mac_dinh', function () {
  	it('signin', function () {
  		cy.visit(signinLink);
 		cy.get('input[name=email]').type('doctor_10@gmail.com');
 		cy.get('input[name=password]').type('Methadone@2017{enter}');
  		cy.wait(500);
 		cy.visit(newpatientsLink);
 		cy.get('div[name=resident_district_id]').click();
 		cy.get('.ui-select-choices-group ul li div').should('have.css','text-align','left');
  	});
  })