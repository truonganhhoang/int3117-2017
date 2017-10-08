describe('THEMMOI_BN_95', function(){
  it('Dang nhap', function(){
    
      cy.visit('/signin')
        .get('input[name=email]').type(user.doctor.email)
        .get('input[name=password]').type(user.doctor.password)
        .get('button[type=submit]').click()
    
  })
  it('kiểm tra thông tin bắt buộc', function () {
       cy.contains('Quản lý bệnh nhân').click()
       cy.contains('Thêm').click()
       cy.get(' body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div.row.fow-flex > div.col-xs-12.col-md-x170px > div > div:nth-child(1) > div > input').type('fhqkie')
	cy.get('body > div.ng-scope > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div.row.fow-flex > div.col-xs-12.col-md-x170px > div > div:nth-child(2) > div > label.input-group > input').type('1/1/1997{enter}')
	cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div.row.fow-flex > div.col-xs-12.col-md-x170px > div > div:nth-child(3) > div > div.ui-select-container.select2.select2-container.ng-empty.ng-invalid.ng-invalid-required > a > span.select2-chosen.ng-binding').click()
	cy.get('#ui-select-choices-row-26-0 > div').click()
	cy.get('body > div.ng-scope > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div.row.fow-flex > div.col-xs-12.col-md-x170px > div > div:nth-child(10) > div > label.input-group > input').type('20/09/2017{enter}')
	cy.get('div.row:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > a:nth-child(1)').click()
	cy.contains('Đại Yên').click()
	cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(3) > div:nth-child(1) > div > a > i').click()

	//cy.get('div.ng-empty:nth-child(3) > a:nth-child(1) > span:nth-child(3)').click()
	cy.get('div.ng-pristine:nth-child(2) > a:nth-child(1)').click()
	cy.contains('Bố').click()
	cy.get('div.row:nth-child(4) > div:nth-child(2) > div:nth-child(1) > input:nth-child(2)').type('947295')
	cy.get('body > div.ng-scope > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(4) > div:nth-child(3) > div > label.input-group > input').type('03/1/2017{enter}')
	cy.get('div.row:nth-child(4) > div:nth-child(4) > div:nth-child(1) > input:nth-child(2)').type('dhajerkf')
	cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div.general-item-list > div > div > div:nth-child(1) > div > input').type('hgiakrf')
	cy.contains('Lưu').click()
	

  })
})
