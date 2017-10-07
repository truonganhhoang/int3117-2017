describe('CommonTC_G_89', function(){
  it('Dang nhap bang tai khoan admin', function(){
		cy.visit('/signin')
			.get('input[name=email]').type('user.admin.email')
		  .get('input[name=password]').type('user.admin.password')
		  .get('button[type=submit]').click()
	})

  it('Quan ly nguoi dung', function () {
    cy.get('li.nav-item > a[ui-sref="main.administrators"]').click().wait(1000)
    })
	
	it('Kiểm tra việc nhập nhập giá trị Maxlength', function () {  
    cy.get('.btn').click().wait(1000)
    cy.get('input.ng-valid-email').type('fgasawr@gmail.com')
    cy.get('input.ng-valid-minlength').type('wwraghdbsvmsbvfsabjdhfkaligahglyagaskjhgwuggshagghsjhbvnbvjzshgdsgaiweghdsgahkrehf2/*#')
    cy.get('div.form-group:nth-child(3) > input:nth-child(2)').type('Marki')
    cy.get('div.form-group:nth-child(4) > input:nth-child(2)').type('Hov')
    cy.get('.select2-arrow > b:nth-child(1)').click()
    cy.get('.ui-select-choices-row-inner').contains('CSĐT MMT Ba Vì').click()
    cy.get('button.btn.blue-custom.btn-sm.ng-binding').click()
    cy.get('.ng-active > div:nth-child(1)').should(($loi) => {
        expect($loi).to.contain('Trường này không được quá 50 ký tự.') 
	})
})
})