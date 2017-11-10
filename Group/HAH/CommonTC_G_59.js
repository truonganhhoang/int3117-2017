describe ('CommonTC_G_5_Kiem tra Checkall', function() {
	it('Vao trang', function() {
		cy.visit('http://uet.vnu.edu.vn/~thanhld/lects/webapp-development/danhsach/');
	});
	it('Kiem tra',function() {
		cy.get('input#chkall').click();
		cy.wait(1000);
		cy.get('input#chk1').click();
		cy.wait(1000);
		cy.get('input#chkall').should('not.be.checked');
		cy.wait(1000);
	});
});