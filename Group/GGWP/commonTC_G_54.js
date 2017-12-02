/**
 * pass
 * TC Combo Box
 * 
 * co Combo Box
 * admin_10@gmail.com
 *
 * khong co Combo Box
 * admin_agency_10@gmail.com
 * doctor_10@gmail.com
 * nurse_10@gmail.com
 * storekeeper_10@gmail.com
 */

const expect = require('chai').expect;

const delay = 3000 // 3second delay trang mang lag
const mail = 'admin_10@gmail.com';

describe(`Kiem tra Combo Box voi tai khoan ${mail}`, function () {
    it('Login ...', function() {
        beforeEach(function() {
            cy.visit('/signin');
            cy.fixture('users').then(users => {
                cy.doLoginAs(users.admin);
            })
            cy.visit('/main/patients')
        });
    })

    describe('Danh mục nghề nghiệp', function () {
        it('Gia tri Sap Xep theo alphabet', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/employments')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice').click()
            var values = [];
            cy.get('#ui-select-choices-0').within(function(){
                cy.get('li>div>span').each(function($span, index, $spans){
                    values.push($span.text())
                }).then(() => {
                    assert.isTrue(alphabet(values));
                })              
            })
        })
    })

    describe('Danh mục hôn nhân', function () {
        it('Gia tri Sap Xep theo alphabet', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/maritals')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice').click()
            var values = [];
            cy.get('#ui-select-choices-0').within(function(){
                cy.get('li>div>span').each(function($span, index, $spans){
                    values.push($span.text())
                }).then(() => {
                    assert.isTrue(alphabet(values));
                })              
            })
        })
    })
    describe('Danh mục tài chính', function () {
        it('Gia tri Sap Xep theo alphabet', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/financials')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice').click()
            var values = [];
            cy.get('#ui-select-choices-0').within(function(){
                cy.get('li>div>span').each(function($span, index, $spans){
                    values.push($span.text())
                }).then(() => {
                    assert.isTrue(alphabet(values));
                })              
            })
        })
    })
    describe('Danh mục trình độ học vấn', function () {
        it('Gia tri Sap Xep theo alphabet', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/educations')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice').click()
            var values = [];
            cy.get('#ui-select-choices-0').within(function(){
                cy.get('li>div>span').each(function($span, index, $spans){
                    values.push($span.text())
                }).then(() => {
                    assert.isTrue(alphabet(values));
                })              
            })
        })
    })
    describe('Danh mục lý do ngừng điều trị', function () {
        it('Gia tri Sap Xep theo alphabet', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/stop_reasons')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice').click()
            var values = [];
            cy.get('#ui-select-choices-0').within(function(){
                cy.get('li>div>span').each(function($span, index, $spans){
                    values.push($span.text())
                }).then(() => {
                    assert.isTrue(alphabet(values));
                })              
            })
        })
    })
    describe('Danh mục thuốc', function () {
        it('Gia tri Sap Xep theo alphabet', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/medicine_list')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice').click()
            var values = [];
            cy.get('#ui-select-choices-0').within(function(){
                cy.get('li>div>span').each(function($span, index, $spans){
                    values.push($span.text())
                }).then(() => {
                    assert.isTrue(alphabet(values));
                })              
            })
        })
    })
    describe('Danh mục nhà sản xuất ', function () {
        it('Gia tri Sap Xep theo alphabet', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/manufacturers')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice').click()
            var values = [];
            cy.get('#ui-select-choices-0').within(function(){
                cy.get('li>div>span').each(function($span, index, $spans){
                    values.push($span.text())
                }).then(() => {
                    assert.isTrue(alphabet(values));
                })              
            })
        })
    })
    describe('Danh mục nhà phân phối', function () {
        it('Gia tri Sap Xep theo alphabet', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/providers')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice').click()
            var values = [];
            cy.get('#ui-select-choices-0').within(function(){
                cy.get('li>div>span').each(function($span, index, $spans){
                    values.push($span.text())
                }).then(() => {
                    assert.isTrue(alphabet(values));
                })              
            })
        })
    }) 
    describe('Danh mục nguồn thuốc', function () {
        it('Gia tri Sap Xep theo alphabet', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/sources')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice').click()
            var values = [];
            cy.get('#ui-select-choices-0').within(function(){
                cy.get('li>div>span').each(function($span, index, $spans){
                    values.push($span.text())
                }).then(() => {
                    assert.isTrue(alphabet(values));
                })              
            })
        })
    })

})
let alphabet = function(a){
    let b = a.concat();
    b.sort(function(x, y) { 
        return x.toString().localeCompare(y);
    });
    return arrayEquals(a, b)
}

let arrayEquals = function(a, b){
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
  }