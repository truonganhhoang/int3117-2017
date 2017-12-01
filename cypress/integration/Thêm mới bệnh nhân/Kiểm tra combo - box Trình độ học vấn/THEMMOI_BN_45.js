/**
 * pass
 * TC THEMMOI_BN
 * 
 * Co THEMMOI_BN
 * admin_agency_10@gmail.com
 * doctor_10@gmail.com
 *
 * khong co Combo Box
 * admin_10@gmail.com
 * nurse_10@gmail.com
 * storekeeper_10@gmail.com
 */

const delay = 3000
const doctor = "doctor_10@gmail.com";
const agency = "admin_agency_10@gmail.com";

describe(`Kiem tra Combo Box voi tai khoan ${agency}`, function(){
    it('Login ...', function() {
        cy.visit('/signin');
        cy.fixture('users').then(users => {
            cy.doLoginAs(users.agency);
        })
        cy.visit("/main/patients/new")
    })
    it("Kiểm tra là trường không bắt buộc", function(){
        cy.wait(delay)

        cy.get('[name="name"]').eq(0).type('Nguyen Van CCC');

        cy.get('[name="birth_date"]').type('21/01/2011').type('{esc}');
        cy.get("label").contains("Giới tính")
            .next().find('a.select2-choice').click()

        cy.get('#ui-select-choices-row-13-1').click();

        cy.get('[name="mobile_phone"]').type('0989868686');
        
        cy.get("label").contains("Nghề nghiệp")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-15-1').click();
        
        cy.get("label").contains("Tình trạng hôn nhân")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-16-1').click();

        cy.get("label").contains("Tình hình tài chính")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-18-1').click();

        cy.get('[name="admission_date"]').type('21/09/2017').type('{esc}');
        cy.get("label").contains("Nơi giới thiệu")
            .next().type('DEF')

        cy.get("label").contains("Tỉnh/Thành phố thường trú")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-19-0').click();
        
        cy.get("label").contains("Huyện/Quận thường trú")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-20-1').click();
        
        cy.get("label").contains("Xã/Thị Trấn thường trú")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-21-1').click();
        
        cy.get("label").contains("Thôn/Ấp thường trú")
            .next().type('DEF')
        
        cy.get("label").contains("Địa chỉ thường trú")
            .next().type('DEF')

        cy.get("label").contains("Xã/Thị Trấn tạm trú")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-24-1').click();

        cy.get("label").contains("Thôn/Ấp tạm trú")
            .next().type('DEF')

        cy.get("label").contains("Địa chỉ tạm trú")
            .next().type('DEF')

        cy.get("label").contains("Loại giấy tờ")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-25-1').click();

        cy.get("label").contains("Số")
            .next().type(1)

        cy.get('[name="identification_issued_date"]').type('01/09/2017').type('{esc}');

        cy.get("label").contains("Nơi cấp")
            .next().type("DEF")
        cy.get('[name="name"]').eq(1).type('Bố')

        cy.get("label").contains("Mối quan hệ")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-26-1').click();

        cy.get('[ng-model="contact.address"]').type("DEF")
        cy.get('[name="telephone"]').type('0924688686')

        cy.get(".inputs [type='submit']")
            .click()
            .get('div[ng-switch]')
            .find('.toast-message')
            .should('contain', "Tạo mới thành công");
    })

})

describe(`Kiem tra Combo Box voi tai khoan ${doctor}`, function(){
    it('Login ...', function() {
        cy.visit('/signin');
        cy.fixture('users').then(users => {
            cy.doLoginAs(users.doctor);
        })
        cy.visit("/main/patients/new")
    })
    it("Kiểm tra là trường không bắt buộc", function(){
        cy.wait(delay)

        cy.get('[name="name"]').eq(0).type('Nguyen Van DDD');

        cy.get('[name="birth_date"]').type('02/01/2011').type('{esc}');
        cy.get("label").contains("Giới tính")
            .next().find('a.select2-choice').click()

        cy.get('#ui-select-choices-row-13-1').click();

        cy.get('[name="mobile_phone"]').type('0979868686');
        
        cy.get("label").contains("Nghề nghiệp")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-15-2').click();
        
        cy.get("label").contains("Tình trạng hôn nhân")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-16-2').click();

        cy.get("label").contains("Tình hình tài chính")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-18-2').click();

        cy.get('[name="admission_date"]').type('02/09/2017').type('{esc}');
        cy.get("label").contains("Nơi giới thiệu")
            .next().type('DEF')

        cy.get("label").contains("Tỉnh/Thành phố thường trú")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-19-2').click();
        
        cy.get("label").contains("Huyện/Quận thường trú")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-20-2').click();
        
        cy.get("label").contains("Xã/Thị Trấn thường trú")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-21-2').click();
        
        cy.get("label").contains("Thôn/Ấp thường trú")
            .next().type('DEF')
        
        cy.get("label").contains("Địa chỉ thường trú")
            .next().type('DEF')

        cy.get("label").contains("Xã/Thị Trấn tạm trú")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-24-2').click();

        cy.get("label").contains("Thôn/Ấp tạm trú")
            .next().type('DEF')

        cy.get("label").contains("Địa chỉ tạm trú")
            .next().type('DEF')

        cy.get("label").contains("Loại giấy tờ")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-25-2').click();

        cy.get("label").contains("Số")
            .next().type(1)

        cy.get('[name="identification_issued_date"]').type('21/09/2017').type('{esc}');

        cy.get("label").contains("Nơi cấp")
            .next().type("DEF")
        cy.get('[name="name"]').eq(1).type('Bố')

        cy.get("label").contains("Mối quan hệ")
            .next().find('a.select2-choice').click()
        cy.get('#ui-select-choices-row-26-1').click();

        cy.get('[ng-model="contact.address"]').type("DEF")
        cy.get('[name="telephone"]').type('0924688686')

        cy.get(".inputs [type='submit']")
            .click()
            .get('div[ng-switch]')
            .find('.toast-message')
            .should('contain', "Tạo mới thành công");
    })

})