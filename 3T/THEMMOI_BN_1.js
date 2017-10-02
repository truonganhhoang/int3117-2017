describe('Kiểm tra màn hình ở trạng thái mặc định', function() {
    // Đăng nhập và chuyển tới trang thêm bệnh nhân
    beforeEach(function(){

    	cy.visit(Cypress.env('URL_LOGIN'));
    	cy.get('input[name=email]').type(Cypress.env('USER_AGENCY'));
    	cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'));
    	cy.get('button[type=submit]').click();

    	cy.wait(3000);
    	cy.visit(Cypress.env('URL_ADD_NEW_PATIENT'));
    	cy.wait(1000);
    })

    var addPatientFormSelector = 'form.ng-scope.ng-invalid-required.ng-valid-pattern.ng-pending.ng-dirty.ng-valid-parse';

    var patientFields = [
    	{name: 'name', label: 'Họ và tên'},
    	{name: 'birthdate', label: 'Ngày sinh'},
    	{name: 'gender', label: 'Giới tính'},
    	{name: 'ethnicity_id', label: 'Dân tộc',
                default: {val: 'Kinh', selector: 'span.ng-binding'}},
    	{name: 'mobile_phone', label: 'Điện thoại'},
    	{name: 'jobs', label: 'Nghề nghiệp'},
    	{name: 'marital_status', label: 'Tình trạng hôn nhân'},
    	{name: 'education_level', label: 'Trình độ học vấn'},
    	{name: 'financial_status', label: 'Tình hình tài chính'},
    	{name: 'admission_date', label: 'Ngày vào điều trị'},
    	{name: 'referral_agency', label: 'Nơi giới thiệu'},
    	{name: 'province_id', label: 'Tỉnh/Thành phố thường trú',
                default: {val: 'Hà Nội', selector: 'span.ng-binding'}},
    	{name: 'district_id', label: 'Huyện/Quận thường trú',
                default: {val: 'Chương Mỹ', selector: 'span.ng-binding'}},
    	{name: 'ward_id', label: 'Xã/Thị Trấn thường trú'},
    	{name: 'hamlet', label: 'Thôn/Ấp thường trú'},
    	{name: 'address', label: 'Địa chỉ thường trú'},
        {name: 'resident_province_id', label: 'Tỉnh/Thành phố tạm trú',
                default: {val: 'Hà Nội', selector: 'span.ng-binding'}},
    	{name: 'resident_district_id', label: 'Huyện/Quận tạm trú',
                default: {val: 'Chương Mỹ', selector: 'span.ng-binding'}},
    	{name: 'resident_ward_id', label: 'Xã/Thị Trấn tạm trú'},
    	{name: 'resident_hamlet', label: 'Thôn/Ấp tạm trú'},
    	{name: 'resident_address', label: 'Địa chỉ tạm trú'},
        {name: 'identification_type', label: 'Loại giấy tờ'},
        {name: 'identification_number', label: 'Số'},
        {name: 'identification_issued_date', label: 'Ngày cấp'},
        {name: 'identification_issued_by', label: 'Nơi cấp'}
    ];

    var contactFields = [
    	{name: 'name', label: 'Họ và tên'},
    	{name: 'contact_type', label: 'Mối quan hệ'},
    	{name: 'address', label: 'Địa chỉ'},
    	{name: 'telephone', label: 'Điện thoại'},
    ];
    

    it('Hiên thị title của chức năng trên màn hình', function () {
    	cy.get(addPatientFormSelector).find('.caption-subject').contains('Thông tin chi tiết');
    });

    it('Focus vào input đầu tiên của form', function () {
    	cy.get(addPatientFormSelector).find('input').first().focused().should('exist');
    });


    it('Kiểm tra form có đầy đủ các trường', function () {

        cy.get(addPatientFormSelector).within(function() {
            // kiểm tra đầy đủ các trường của bệnh nhân
            for (let i = 0; i < patientFields.length; i++) {
                var field = patientFields[i];
                var selector = '[ng-model="patient.'+ field['name'] +'"]';
                cy.get(selector).closest('.form-group').contains(field['label']);
            }

            // kiểm tra đầy đủ các trường của người thân bệnh nhân
            cy.contains('Thông tin người thân')
            cy.get('div[name="contactForm"]').within(function() {
                for (let i = 0; i < contactFields.length; i++) {
                    var field = contactFields[i];
                    var selector = '[ng-model="contact.'+ field['name'] +'"]';
                    cy.get(selector).closest('.form-group').contains(field['label']);
                }
            })
        });
    });


    it('Kiểm tra giá trị mặc định', function () {

        cy.get(addPatientFormSelector).within(function() {
            // kiểm tra đầy đủ các trường của bệnh nhân
            for (let i = 0; i < patientFields.length; i++) {
                var field = patientFields[i];
                var defaultValue = patientFields[i].default;
                if (defaultValue) {
                    var selector = '[ng-model="patient.'+ field['name'] +'"]';
                    cy.get(selector).find(defaultValue.selector).contains(defaultValue.val);
                }
            }
        });
    });
})
