describe("Thêm mới benh nhan", function(){
  context("Kiem tra combo-box huyen quan thuong tru", function(){
    //Đăng nhập chuyển tới trang thêm bệnh nhân
    beforeEach(function(){
      cy
        .visit('/')
        .get("input[name='email']").type("admin_agency_10@gmail.com")
        .get("input[name='password']").type("Methadone@2017{enter}")
        .pause()
        .visit('/main/patients/new')
    })

    it("Kiem tra gia tri mac dinh", function(){
      cy
      .get("label.required")
      .contains("Tỉnh/Thành phố thường trú")
      .parent()
      .within(function(){
        cy.root().get(".ui-select-container").click()  
      })
      
      // Chon thanh pho Ha Noi
      cy
        .get("#ui-select-choices-row-19-22")
        .click();

        cy
        .get("label.required")
        .contains("Huyện/Quận thường trú")
        .parent()
        .within(function(){
          cy.root().get(".select2-choice").should('contain','--Vui lòng chọn--')
        })
    })

    it("THEMMOI_BN_67_Kiem tra gia tri", function(){
      var province = [
        "Ba Đình", "Ba Vì", "Bắc Từ Liêm", "Cầu Giấy", "Chương Mỹ", "Đan Phượng",
        "Đông Anh", "Đống Đa", "Gia Lâm", "Hà Đông", "Hai Bà Trưng", "Hoài Đức",
        "Hoàn Kiếm", "Hoàng Mai", "Long Biên", "Mê Linh", "Mỹ Đức", "Nam Từ Liêm",
        "Phú Xuyên", "Phúc Thọ", "Quốc Oai", "Sóc Sơn", "Tây Hồ", "Thạch Thất", 
        "Thanh Oai", "Thanh Trì", "Thanh Xuân", "Thị Xã Sơn Tây", "Thường Tín",
        "Ứng Hòa"
      ]
      cy.pause()
      // Mo select Ha Noi
      cy
      .get("label.required")
      .contains("Tỉnh/Thành phố thường trú")
      .parent()
      .within(function(){
        cy.root().get(".ui-select-container").click()  
      })
      
      // Chon thanh pho Ha Noi
      cy
        .get("#ui-select-choices-row-19-22")
        .click();

      // open select Huyen/Quan thuong tru
      cy
      .get("label.required")
      .contains("Huyện/Quận thường trú")
      .parent()
      .within(function(){
        cy.root().get(".ui-select-container").click()  
      })

      cy.pause()

      cy.get("#ui-select-choices-20 > li > div").find("span")
      .should(function($p){
        var texts = $p.map(function(i, el){
          return Cypress.$(el).text()
        })
        texts = texts.get()
        expect(texts).to.have.length(30)

        //expect(texts).to.deep.eq(province)
        texts.forEach(function(e){
          expect(province.indexOf(e)).to.not.eq(-1)
        })
        
      })
      
     
    
    })
  
  })
})