describe ('CommonTC_G_58_Kiem tra Checkall', function() {
	it('Vao trang', function() {
		cy.visit('http://uet.vnu.edu.vn/~thanhld/lects/webapp-development/danhsach/');
	});
	it('Tich chon Checkall',function() {
		cy.get('input#chkall').click();
		cy.wait(1000);
		cy.get('input#chk1').should('checked');
		cy.get('input#chk2').should('checked');
		cy.get('input#chk3').should('checked');
		cy.get('input#chk4').should('checked');
		cy.wait(1000);
	});
	it('Bo chon Checkall', function() {
		cy.get('input#chkall').click();
		cy.wait(1000);
		cy.get('input#chk1').should('not.be.checked');
		cy.get('input#chk2').should('not.be.checked');
		cy.get('input#chk3').should('not.be.checked');
		cy.get('input#chk4').should('not.be.checked');
		cy.wait(1000);
	});

});