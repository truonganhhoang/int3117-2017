const fillFullInformationRequire = (i) => {
    cy.fixture('patient_fake').then(patient => {
        //Fill name (exist 2 input[ng-model="patient.name"])
        cy.get('input[ng-model="patient.name"]')
            .filter('.ng-invalid-required')
            .type(patient[i].name);
        cy.get('input[ng-model="patient.birthdate"]').type(patient[i].birthdate);
        cy.mySelect('div[ng-model="patient.gender"]', patient[i].gender);
        cy.mySelect('div[ng-model="patient.province_id"]', patient[i].province_id);
        cy.mySelect('div[ng-model="patient.district_id"]', patient[i].district_id);
        cy.mySelect('div[ng-model="patient.ward_id"]', patient[i].ward_id);
        cy.get('input[ng-model="patient.admission_date"]').type(patient[i].admission_date);
        cy.get('a[ng-click="copyHousehold()"]').click();

        cy.mySelect('div[ng-model="patient.identification_type"]', patient[i].identification_type);
        cy.get('input[ng-model="patient.identification_number"]')
            .filter('.ng-invalid-required')
            .type(patient[i].identification_number);
        cy.get('input[ng-model="patient.identification_issued_date"]').type(patient[i].identification_issued_date);
        cy.get('input[ng-model="patient.identification_issued_by"]').type(patient[i].identification_issued_by);
        cy.get('input[ng-model="contact.name"]').type(patient[i].contacts[0].name);
        cy.mySelect('div[ng-model="contact.contact_type"]', patient[i].contacts[0].contact_type);
    });
};

var specialCharacter = '%^&*()';
var htmlCharacter = '<table>';
var valueWithSpace = '    ' + "test";
var vietnam = 'Kiểm tra tiếng việt';

var datas =  [{
    "name" : "nhập các kí tự đặc biệt",
    "contentFill" : specialCharacter,
    "index" : 2,
}, {
    "name" : "nhập dữ liệu là các thẻ html",
    "contentFill" : htmlCharacter,
    "index" : 3,
}, {
    "name" : "gõ thành công khi dữ liệu là tiếng việt",
    "contentFill" : vietnam,
    "index" : 4,
}];

describe('Them moi benh nhan', function () {
    context('Kiem tra textbox "Dia chi tam tru"', () => {
        beforeEach(() => {
            cy.fixture('users').then(users => {
                cy.login(users.doctor)
            });

           cy.visit('/main/patients/new');
        });

        it('Kiem tra gia tri mac dinh', () => {
            cy.get('input[ng-model="patient.address"]')
                .should('be.empty');
        });

        it('Kiem tra la truong khong bat buoc', () => {
            fillFullInformationRequire(0);
            cy.get('button').contains('Lưu').click();
            cy.contains('Tạo mới thành công').should('be.visible');
        });

        datas.forEach((data) => {
            it('Kiem tra ' + data.name, () => {
                fillFullInformationRequire(data.index);
                cy.get('input[ng-model="patient.address"]')
                    .type(data.contentFill);
                cy.get('button').contains('Lưu').click();
                cy.contains('Tạo mới thành công').should('be.visible');
                cy.wait(4000);
                cy.get('a').contains('Thông tin chi tiết').click();
                cy.contains('Địa chỉ thường trú:').next()
                    .should('contain', data.contentFill);
            })
        });


        it('Kiem tra chuc nang Trim space', () => {
            fillFullInformationRequire(1);
            cy.get('input[ng-model="patient.address"]')
                .type(valueWithSpace);
            cy.get('button').contains('Lưu').click();
            cy.contains('Tạo mới thành công').should('be.visible');
            cy.wait(4000);
            cy.get('a').contains('Thông tin chi tiết').click();
            cy.contains('Địa chỉ thường trú:').next()
                .should('not.contain', valueWithSpace);
        });
    })
});
