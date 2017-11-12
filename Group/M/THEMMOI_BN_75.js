describe('Kiem tra thong tin bat buoc',function(){
    it('login',function(){
        cy.visit(Cypress.env("signin"))
        cy.get('input[name=email]').type('doctor_10@gmail.com')
        cy.get('input[name=password]').type('Methadone@2017')
        cy.get('button[type=submit]').click()
        cy.pause()
        cy.visit(Cypress.env("new"))
    })
    //Thong tin chi tiet
    it('Nhap ho va ten',function(){
        cy
        .get("label.required")
        .contains("Họ và tên").parent().within(function(){
            cy.get('input[name=name]').type('Do Duy')
        })
    })
    it('Nhap ngay sinh',function(){
        cy
        .get("label.required")
        .contains("Ngày sinh")
        cy.get('input[name=birth_date]').type('23/10/1998')
    })
    it('Chon gioi tinh',function(){
        cy
        .get("label.required")
        .contains("Giới tính")
        .parent()
        .within(function(){
          cy.root().get(".ui-select-container").click()  
        })
        cy.get('#ui-select-choices-row-13-1').click()
    })
    it('Chon dan toc',function(){
        cy
        .get("label")
        .contains("Dân tộc")
        .parent()
        .within(function(){
          cy.root().get(".ui-select-container").click()  
        })
        cy.get('#ui-select-choices-row-14-25').click()
    })
    it('Nhap dien thoai',function(){
        cy
        .get("label")
        .contains("Điện thoại")
        cy.get('input[name=mobile_phone]').first().type('0986154237')
    })
    it('Chon nghe nghiep',function(){
        cy
        .get("label")
        .contains("Nghề nghiệp")
        .parent()
        .within(function(){
          cy.root().get(".ui-select-container").click()  
        })
        cy.get('#ui-select-choices-row-15-1').click()
    })
    it('Chon tinh trang hon nhan',function(){
        cy
        .get("label")
        .contains("Tình trạng hôn nhân")
        .parent()
        .within(function(){
          cy.root().get(".ui-select-container").click()  
        })
        cy.get('#ui-select-choices-row-16-0').click()
    })
    it('Chon trinh do hoc van',function(){
        cy
        .get("label")
        .contains("Trình độ học vấn")
        .parent()
        .within(function(){
          cy.root().get(".ui-select-container").click()  
        })
        cy.get('#ui-select-choices-row-17-6').click()
    })
    it('Chon tinh hinh tai chinh',function(){
        cy
        .get("label")
        .contains("Tình hình tài chính")
        .parent()
        .within(function(){
          cy.root().get(".ui-select-container").click()  
        })
        cy.get('#ui-select-choices-row-18-1').click()
    })
    it('Nhap ngay vao dieu tri',function(){
        cy
        .get("label.required")
        .contains("Ngày vào điều trị")
        cy.get('input[name=admission_date]').type('20/04/2010')
    })
    it('Nhap noi gioi thieu',function(){
        cy
        .get("label")
        .contains("Nơi giới thiệu")
        cy.get('input[name=referral_agency]').type('Benh vien da khoa Thai Nguyen')
    })
    it('Chon tinh/thanh pho thuong tru',function(){
        cy
        .get("label.required")
        .contains("Tỉnh/Thành phố thường trú")
        .parent()
        .within(function(){
          cy.root().get(".ui-select-container").click()  
        })
        cy.get('#ui-select-choices-row-19-22').click()
    })
    it('Chon huyen/quan thuong tru',function(){
        cy
        .get("label.required")
        .contains("Huyện/Quận thường trú")
        .parent()
        .within(function(){
          cy.root().get(".ui-select-container").click()  
        })
        cy.get('#ui-select-choices-row-20-4').click()
    })
    it('Chon tinh/thanh pho tam tru',function(){
        cy
        .get("label.required")
        .contains("Tỉnh/Thành phố tạm trú")
        .parent()
        .within(function(){
          cy.root().get(".ui-select-container").click()  
        })
        cy.get('#ui-select-choices-row-22-22').click()
    })
    it('Chon huyen/quan tam tru',function(){
        cy
        .get("label.required")
        .contains("Huyện/Quận tạm trú")
        .parent()
        .within(function(){
          cy.root().get(".ui-select-container").click()  
        })
        cy.get('#ui-select-choices-row-23-4').click()
    })
    it('Chon xa/thi tran tam tru',function(){
        cy
        .get("label.required")
        .contains("Xã/Thị Trấn tạm trú")
        .parent()
        .within(function(){
          cy.root().get(".ui-select-container").click()  
        })
        cy.get('#ui-select-choices-row-24-2').click()
    })
    it('Chon loai giay to',function(){
        cy
        .get("label.required")
        .contains("Loại giấy tờ")
        .parent()
        .within(function(){
          cy.root().get(".ui-select-container").click()  
        })
        cy.get('#ui-select-choices-row-25-0').click()
    })
    it('Nhap so',function(){
        cy
        .get("label.required")
        .contains("Số")
        .get('input[name=identification_number]').first().type('134023')
    })
    it('Nhap ngay cap',function(){
        cy
        .get("label.required")
        .contains("Ngày cấp")
        cy.get('input[name=identification_issued_date]').type('12/09/2013')
    })
    it('Nhap noi cap',function(){
        cy
        .get("label.required")
        .contains("Nơi cấp")
        cy.get('input[name=identification_issued_by]').type('Thai Nguyen')
    })
    //Thong tin nguoi than
    it('Nhap ten',function(){
        cy.get('input[ng-model = "contact.name"]').type('cde')
    })
    it('Chon moi quan he',function(){
        cy
        .get("label.required")
        .contains("Mối quan hệ")
        .parent()
        .within(function(){
          cy.root().get(".ui-select-container").click()  
        })
        cy.get('#ui-select-choices-row-26-0').click()
    })
    it('Nhap dien thoai',function(){
        cy.get('input[ng-model = "contact.telephone"]').type('0987346125')
    })
    it('Luu',function(){
        cy.get('button[type=submit]').first().click()
    })
    it('Hien thi thong bao nhap xa/thi tran',function(){
        cy
        .get("label.required")
        .contains("Xã/Thị Trấn thường trú")
        .parent()
        .within(function(){
            cy.root().get("div.text-error > div").contains("Trường này không được để trống.")
        })
    })
})