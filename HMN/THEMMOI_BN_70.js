describe("Thêm mới benh nhan", function(){
    context("Kiem tra combo-box huyen quan thuong tru", function(){
        //Đăng nhập chuyển tới trang thêm bệnh nhân
        beforeEach(function(){
           cy
              .visit('/')
              .get("input[name='email']").type("admin_agency_10@gmail.com")
              .get("input[name='password']").type("Methadone@2017{enter}")

              .visit('/main/patients/new')
        })
        it("THEMMOI_BN_70_Kiem_tra_thong_tin_bat_buoc", function(){
           
            //Nhập họ và tên
                cy.get("label.required").contains("Họ và tên").parent().within(function(){
                cy.root().get("input[name='name']").type("Nguyễn Văn A")    
            })

            //Nhập ngày sinh
            cy.get("label.required").contains("Ngày sinh").parent().within(function(){
                cy.root().get("input[name='birth_date']").type("11/02/1996")    
            })

            //Nhập giới tính
            cy.get("label.required").contains("Giới tính").parent().within(function(){
                cy.root().get(".ui-select-container").click()
            })
            .get("#ui-select-choices-row-13-0").click()

            //Nhập ngày vào điều trị
            cy.get("label.required").contains("Ngày vào điều trị").parent().within(function(){
                cy.root().get("input[name='admission_date']").type("10/10/2016")    
            })

            // Mo select Ha Noi
                cy.get("label.required").contains("Tỉnh/Thành phố thường trú").parent().within(function(){
                    cy.root().get(".ui-select-container").click()  
                })
                // Chon thanh pho Ha Noi
                .get("#ui-select-choices-row-19-18").click()

            //Tỉnh tạm trú 
                cy.get("label.required").contains("Tỉnh/Thành phố tạm trú").parent().within(function(){
                    cy.root().get(".ui-select-container").click()  
                })
                .get("#ui-select-choices-row-22-22").click()

            //huyện tạm trú 
                cy.get("label.required").contains("Huyện/Quận tạm trú").parent().within(function(){
                    cy.root().get(".ui-select-container").click()  
                })
                .get("#ui-select-choices-row-23-4").click()


            //Xã thị trấn tạm trú
                cy.get("label.required").contains("Xã/Thị Trấn tạm trú").parent().within(function(){
                    cy.root().get(".ui-select-container").click()  
                })
                .get("#ui-select-choices-row-24-0").click()

            //Loại giấy tờ
                cy.get("label.required").contains("Loại giấy tờ").parent().within(function(){
                    cy.root().get(".ui-select-container").click()  
                })
                .get("#ui-select-choices-row-25-2").click()

            //Số
                cy.get("label.required").contains("Số").parent().within(function(){
                    cy.root().get("input[name='identification_number']").type('12345678')  
                })

            //Ngày cấp
                cy.get("label.required").contains("Ngày cấp").parent().within(function(){
                    cy.root().get("input[name='identification_issued_date']").type('10/8/2011')  
                })

            //Nơi cấp
                cy.get("label.required").contains("Nơi cấp").parent().within(function(){
                    cy.root().get("input[name='identification_issued_by']").type('Hà Nội')  
                })
            
            //Moi quan he
                cy.get("label.required").contains("Mối quan hệ").parent().within(function(){
                    cy.root().get(".ui-select-container").click()  
                })
            cy.get("#ui-select-choices-row-26-3").click()

            cy.get(".portlet-title.tabbable-line").find('button.btn.blue-custom.btn-sm.ng-binding').click()
            
            cy.get("label.required").contains("Huyện/Quận thường trú").parent().within(function(){
                            cy.root().get("div.text-error > div").contains("Trường này không được để trống.")
                        })

            cy.get("label.required").contains("Xã/Thị Trấn thường trú").parent().within(function(){
                            cy.root().get("div.text-error > div").contains("Trường này không được để trống.")
                        })

            
        })
        })
})
