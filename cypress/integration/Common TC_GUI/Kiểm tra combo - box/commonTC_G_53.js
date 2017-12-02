/**
 * fail
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
        it('Gia tri mac dinh nen la ""', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/employments')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice')
            .should('have.attr', 'placeholder', '')
            // .should('have.attr', 'placeholder', '-- Tất cả---')
        })
    })

    describe('Danh mục hôn nhân', function () {
        it('Gia tri mac dinh nen la ""', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/maritals')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice')
            .should('have.attr', 'placeholder', '')
            // .should('have.attr', 'placeholder', '-- Tất cả---')
        })
    })
    describe('Danh mục tài chính', function () {
        it('Gia tri mac dinh nen la ""', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/financials')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice')
            .should('have.attr', 'placeholder', '')
            // .should('have.attr', 'placeholder', '-- Tất cả---')
        })
    })
    describe('Danh mục trình độ học vấn', function () {
        it('Gia tri mac dinh nen la ""', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/educations')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice')
            .should('have.attr', 'placeholder', '')
            // .should('have.attr', 'placeholder', '-- Tất cả---')
        })
    })
    describe('Danh mục lý do ngừng điều trị', function () {
        it('Gia tri mac dinh nen la ""', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/stop_reasons')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice')
            .should('have.attr', 'placeholder', '')
            // .should('have.attr', 'placeholder', '-- Tất cả---')
        })
    })
    describe('Danh mục thuốc', function () {
        it('Gia tri mac dinh nen la ""', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/medicine_list')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice')
            .should('have.attr', 'placeholder', '')
            // .should('have.attr', 'placeholder', '-- Tất cả---')
        })
    })
    describe('Danh mục nhà sản xuất ', function () {
        it('Gia tri mac dinh nen la ""', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/manufacturers')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice')
            .should('have.attr', 'placeholder', '')
            // .should('have.attr', 'placeholder', '-- Tất cả---')
        })
    })
    describe('Danh mục nhà phân phối', function () {
        it('Gia tri mac dinh nen la ""', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/providers')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice')
            .should('have.attr', 'placeholder', '')
            // .should('have.attr', 'placeholder', '-- Tất cả---')
        })
    }) 
    describe('Danh mục nguồn thuốc', function () {
        it('Gia tri mac dinh nen la ""', function () {
            // cy.wait(delay)
            cy.visit('main/admin/administrators/sources')
            cy.wait(delay)
            cy.get("label").contains("Trạng thái:")
            .next().find('a.select2-choice')
            .should('have.attr', 'placeholder', '')
            // .should('have.attr', 'placeholder', '-- Tất cả---')
        })
    })

})