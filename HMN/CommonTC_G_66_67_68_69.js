describe("Calendar", function(){
    context("Kiểm tra trường ngày tháng (lấy từ calendar)", function(){
    //Đăng nhập chuyển tới trang báo cáo tổng hợp
        beforeEach(function(){
            cy
                .visit('/')
                .get("input[name='email']").type("admin_10@gmail.com")
                .get("input[name='password']").type("Methadone@2017{enter}")
                .visit(Cypress.env('report'))
        })

        it("CommonTC_G_66_Kiem_tra_focus_khi_textbox_chua_co_gia_tri", function(){
            //Ngày hiện tại trên client
            var now = new Date();
            var array = {
                1: "January",
                2: "February",
                3: "March",
                4: "April",
                5: "May",
                6: "June",
                7: "July",
                8: "August",
                9: "September",
                10: "October",
                11: "November",
                12: "December"
            }
            var mon = now.getMonth() + 1;
            //Lấy tháng theo tên
            var month = array[mon];
            var monthYear = month +" "+ now.getFullYear().toString();
            cy
                //Mở calendar
                .get("label.required").contains("Đến ngày").parent().within(function(){
                    cy.root().get("i[class='fa fa-calendar']").click()  
                })
                //Kiểm tra ngày
                .get("td.today.day").should("contain",now.getDate())
                //Kiểm tra tháng năm
                .get("th[class='datepicker-switch']").should("contain",monthYear)
        })

        it("CommonTC_G_67_Kiem_tra_focus_khi_textbox_co_gia_tri", function(){
            cy
                //Nhập ngày bất kỳ
                .get("input[name='to_date']").type("20/10/2017{enter}")
                //Mở calendar
                .get("label.required").contains("Đến ngày").parent().within(function(){
                    cy.root().get("i[class='fa fa-calendar']").click()  
                })
                //Kiểm tra ngày
                .get("td.active.day").should("contain","20")
                //Kiểm tra tháng năm
                .get("th[class='datepicker-switch']").should("contain","October 2017")
        })

        it("CommonTC_G_68_Kiem_tra_hoat_dong_calender", function(){
            var date = new Date();
            var formatDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + date.getFullYear();
            cy
                //Mở calendar
                .get("label.required").contains("Đến ngày").parent().within(function(){
                    cy.root().get("i[class='fa fa-calendar']").click()  
                })
                //chọn ngày bất kỳ (chọn ngày hôm nay)
                .get('.datepicker-days').find('td.today').click()
                //đóng calendar
                .get("div").should("not.have.class","datepicker-days")
                .get('input[ng-model="report.to_date"]').should('have.value', formatDate)
        })

        it("CommonTC_G_69_Kiem_tra_reset_trong_textbox_khi_bo_chon", function(){
        //Không có nút bỏ chọn sau textbox calendar
        })
    })
})
