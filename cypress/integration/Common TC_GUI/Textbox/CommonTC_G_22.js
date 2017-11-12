describe(' Kiểm tra giá trị mặc định của Textbox khi tìm kiếm', function() {
  var testcases = [
    {
      url: '/main/admin/administrators',
      name: 'Quản lý người dùng', 
    },
    {
      url:'/main/admin/administrators/issuing_agency',
      name:'Quản lý cơ sở',
    },
    {
      url: '/main/admin/administrators/employments',
      name: 'Danh mục nghề nghiệp',
    },
    {
      url: '/main/admin/administrators/maritals',
      name: 'Danh mục hôn nhân',
    },
    {
      url: '/main/admin/administrators/financials',
      name: 'Danh mục tài chính', 
    },
    {
      url: '/main/admin/administrators/educations',
      name: 'Danh mục trình độ học vấn', 
    },
    {
      url: '/main/admin/administrators/stop_reasons',
      name: 'Danh mục lý do ngừng điều trị',
    },
    {
      url: '/main/admin/administrators/medicine_list',
      name: 'Danh mục thuốc',
    },
    {
      url: '/main/admin/administrators/manufacturers',
      name: 'Danh mục nhà sản xuất',
    },
    {
      url: '/main/admin/administrators/providers',
      name: 'Danh mục nhà phân phối',
    },
    {
      url: '/main/admin/administrators/sources',
      name: 'Danh mục nguồn thuốc',
    },
    {
      url: '/main/patients/720/detail/executive_info',
      name: 'Danh sách bệnh nhân',
    }
  ];
  context('CommonTC_G_20', function(){
    beforeEach(function(){
      cy
        .visit(Cypress.env('URL_LOGIN'))
        .get("input[name='email']").clear().type(Cypress.env('USER_ADMIN'))
        .get("input[name='password']").type(Cypress.env('LOGIN_PASSWORD')).type("{enter}")
        .wait(1000)
    });
    testcases.forEach(function(testcase) {
      it(testcase.name, function() {
        cy.visit(testcase.url);
        cy.wait(500);
        cy.get('[ng-submit="search()"]').find('input').type("#$^()%#@ {enter}")

      });
    });
  });
});
