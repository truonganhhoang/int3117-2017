var delay = 3000;
describe('TC_GUI', function() {
    context('Them moi benh nhan ', function(){
        beforeEach(function(){
            // login url
            cy.visit(Cypress.env("URL_LOGIN"))

            // read file users.json and login as doctor
            cy.fixture('users').then(users => {
                cy.login(users.doctor);
              })
            // visit add new patient link
            cy
            .visit(Cypress.env("URL_ADD_NEW_PATIENT"))
            .wait(delay)
            // .pause()
        })
        
        it('Kiem tra combo box  "Xã/Thị trấn tạm trú',function(){
            // THEM_MOI_BN_102 ---> Kiểm tra giá trị mặc định
            cy.get('.ui-select-container[name=resident_ward_id]')
            .within(function(){
                    cy.get('.select2-chosen').then(($el)=>{
                        // check element ".select2-chosen" thứ nhất - mang giá trị mặc định là "'-- Chọn Xã/Thị trấn --" 
                        // và có lớp ".ng-binding" --> element này đang được hiển thị
                        expect($el.first()).to.have.text('-- Chọn Xã/Thị trấn --').and.to.have.class('ng-binding')
                        // check element ".select2-chosen" thứ hai có lớp ".ng-hide" --> element này được ẩn khi 
                        // người dùng chưa chọn gì cả.
                        expect($el.last()).to.have.class('ng-hide')
                    })
                })
            
            //THEM_MOI_BN_102,103,104,105 ---> Kiểm tra các giá trị mặc đinh trong combo-box

            cy.fixture('location.json').then(location=>{
                // chọn từng Tỉnh/Thành Phó tạm trú
                location.provinces.forEach((province)=>{
                    cy.get('.ui-select-container[name=resident_province_id]')
                        .click()
                        .find('li[role="option"]').contains(province.name).first().click();
                    //  chọn từng Huyện/Quận tạm trú
                    province.districts.forEach((district)=>{
                        cy.get('.ui-select-container[name=resident_district_id]')
                        .click()
                        .find('li[role="option"]').contains(district.name).first().click();

                        // trong từng Tỉnh và Huyện đã chọn, lấy ra một mảng các Xã, Thị Trấn
                        cy.get('.ui-select-container[name=resident_ward_id]')
                        .click()
                        .find('li[role="option"] > div > span')
                        .then(($options)=>{
                            // kiểm tra số lượng
                            expect($options).to.have.length(district.wards.length)
                            // kiểm tra tính đầy đủ, đúng đắn , căn lề và sắp xếp của các giá trị trong combo box
                            // Cách 1 : so sánh và kiểm tra lần lượt từng giá trị trong combo box bằng hàm each
                            var ward_name_before = "A";
                            var ward_name_current = "";
                            // kiểm tra từng giá trị trong combo box : 
                            cy.wrap($options).each((element, index, $list)=>{
                                // kiểm tra căn lề của từng giá trị trong combo box
                                expect(element).to.have.css('text-align','left')
                                // lấy giá trị của dòng này 
                                // Cypress.$() là sử dụng JQuery chứ không phải Cypress
                                ward_name_current = Cypress.$(element).text();
                                // kiểm tra nó có thuộc mảng wards từ trong tài liệu
                                expect(district.wards).to.include(ward_name_current);
                                // kiểm tra sắp xếp các giá trị theo thứ tự alphalbet
                                //  BUG : bảng chữ cái Tiếng Việt không thể áp dụng ( ví dụ trong bảng mã hiện tại của cypress p đứng sau d đứng trước đ)
                                // expect(ward_name_current).to.be.greaterThan(ward_name_before);
                                // tiếp tục vòng lặp
                                ward_name_before = ward_name_current;
                                
                              })

                            //   Cách 2
                            //  lấy tất cả các giá trị trong combo box này cho vào mảng "wards_to_test"
                            var wards_to_test = $options.map((index,element)=>{
                                expect(element).to.have.css('text-align','left');
                                return Cypress.$(element).text();
                            })
                            // kiểm tra đầy đủ các xã thị trấn có trong danh sách chưa  ( đã bao gồm kiểm tra tính đầy đủ
                            // và được sắp xếp đúng như thứ tự trong wards từ tài liệu kiểm thử - chứ không phải alphabet)
                            // với cách này cần đảm bảo mảng wards trong tài liệu kiểm thử phải được sắp xếp theo alphabet
                            expect(district.wards).to.deep.equal(wards_to_test.get())
                            

                        })

                        
                    })
                    
                },this)

            })


            // cy.fixture('district_wards').then(each=>{
            //     cy.get('.ui-select-container[name=resident_district_id]')
            //     .click()
            //     .find('li[role="option"]').contains(each.district).first().click()
    
            //     cy.get('.ui-select-container[name=resident_ward_id]').click().as('selection')
            //     each.wards.forEach(function(element) {
            //         cy.get('@selection').find('li[role="option"]').contains(element)
            //     }, this);
            // })

            
            // cy.get('"select2-choice')
            // cy.fixture('images/bug.png').as("avatar")
            // cy.get('input[type=file]').then(function(el) {
            //      Cypress.Blob.base64StringToBlob(this.avatar, 'image/png')
            //       .then(blob => {
            //         el[0].files[0] = blob
            //         el[0].dispatchEvent(new Event('change', {bubbles: true}))
            //       })
            //   })
            // cy.get("input[type=file]")
            // .then(function(input){
            //     input.fileUpload()
            // })
            // .then(function($input){
                
            //       // convert the logo base64 string to a blob
            //       return Cypress.Blob.base64StringToBlob(this.avatar, "image/png").then(function(blob){
                
            //         // pass the blob to the fileupload jQuery plugin
            //         // used in your application's code
            //         // which initiates a programmatic upload
            //         $input.fileupload("add", {files: blob})
            //       })
            //     })
        });
        

    })
})