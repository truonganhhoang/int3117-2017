describe('THEMMOI_BN_96', function(){
  it('Dang nhap', function(){
    
      cy.visit('http://13.76.80.144/signin')
        .get('input[name=email]').type(user.doctor.email)
        .get('input[name=password]').type(user.doctor.password)
        .get('button[type=submit]').click()
    
  })
  it('kiểm tra chức năng tìm kiếm trên combo-box', function () {
       cy.contains('Quản lý bệnh nhân').click()
       cy.contains('Thêm').click()
       cy.get('div.ui-select-container:nth-child(3) > a:nth-child(1) > span:nth-child(3)').click()
	cy.get('div.ui-select-container:nth-child(3) > div:nth-child(2) > div:nth-child(1) > input:nth-child(1)').type('Hà Nội{enter}')
	cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(3) > div:nth-child(1) > div > div.ui-select-container.select2.select2-container.ng-not-empty.ng-valid.ng-valid-required').should('contain','Hà Nội')
       //cy.get('div.ui-select-container:nth-child(3) > a:nth-child(1) > span:nth-child(2)').type('Hà Nội{enter}')
       //cy.get('div.ui-select-container:nth-child(3) > a:nth-child(1) > span:nth-child(2) > span:nth-child(1)').should('Hà Nội')
  })
})
