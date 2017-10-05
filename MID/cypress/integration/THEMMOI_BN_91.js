var delay = 2000;
describe('Common_TC_G_90', function(){
  it('Đăng nhập bằng tài khoản doctor', function(){
    cy.fixture('users').then((user) =>{
      cy.visit('/signin');
      cy.get('input[name=email]').type(user.doctor.email);
      cy.get('input[name=password]').type(user.doctor.password);
      cy.get('button[type=submit]').click();
      cy.wait(delay);
  	})
  })

  it('Vào trang quản lý bệnh nhân', function(){
  	cy.get('body > div > div.page-container.ng-scope > div > div.page-sidebar.navbar-collapse.collapse > ul > li:nth-child(7) > a').click()
  	cy.wait(delay)
  })

  it('Thêm bệnh nhân', function(){
  	cy.get('a.btn.blue-custom.btn-sm.ng-binding.ng-scope').contains('Thêm').click()
  	cy.wait(delay)
  })
  it('Điền vào các trường thường trú', function(){
  	cy.fixture('info').then((info) =>{
  		cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(2) > div:nth-child(1) > div > div.ui-select-container.select2.select2-container.ng-not-empty.ng-valid.ng-valid-required').click()
  		cy.get('li').contains(info.patient.province).click()
  		cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(2) > div:nth-child(2) > div > label').next().click()
  		cy.get('li').contains(info.patient.district).click()
  		cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(2) > div:nth-child(3) > div > div.ui-select-container.select2.select2-container.ng-empty.ng-invalid.ng-invalid-required').click()
  		cy.get('li').contains(info.patient.ward).click()
  		cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(2) > div:nth-child(4) > div > input').type(info.patient.hamlet)
  		cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(2) > div.col-xs-12.col-md-6 > div > input').type(info.patient.address)
  	})
  	
  	})

  it('Lấy địa chỉ tạm trú theo địa chỉ thường trú', function(){
		cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(3) > div:nth-child(1) > div > a > i').click()
  })  	
  	
	it('Kiểm tra giá trị trường tạm trú', function(){
		cy.fixture('info').then((info) => {
			cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(3) > div:nth-child(1) > div > div.ui-select-container.select2.select2-container.ng-not-empty.ng-valid.ng-valid-required').should('contain',info.patient.province)
			cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(3) > div:nth-child(2) > div > div.ui-select-container.select2.select2-container.ng-not-empty.ng-valid.ng-valid-required').should('contain',info.patient.district)
			cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(3) > div:nth-child(3) > div > label').next().should('contain',info.patient.ward)
			cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(3) > div:nth-child(4) > div > input').should('have.value',info.patient.hamlet)
			cy.get('body > div > div.page-container.ng-scope > div > div.page-content-wrapper > div > div > div > div.col-md-8.padding-left-5 > div > form > div > div.portlet-body > div:nth-child(3) > div.col-xs-12.col-md-6 > div > input').should('have.value', info.patient.address)		
		})
	})
})

