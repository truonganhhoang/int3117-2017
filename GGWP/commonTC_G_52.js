/**
 * co textarea
 * admin_agency_10@gmail.com
 * doctor_10@gmail.com
 *
 * khong co textarea
 * nurse_10@gmail.com
 * admin_10@gmail.com
 * storekeeper_10@gmail.com
 */
const expect = require('chai').expect;
const should = require('chai').should();

let delay = 3000 // 3second delay trang mang lag
function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
const rand = getRandomInt(1, 99)
const rand2 = getRandomInt(1, 5)
describe('Kiem tra textarea voi tai khoan admin_agency_10@gmail.com', () => {
    describe('Login with account admin_agency_10@gmail.com', () => {
        it('Login ...', () => {
            cy.visit('http://52.187.8.102/signin')
            cy.get('input[name=email]').type('admin_agency_10@gmail.com')
            cy.get('input[name=password]').type('Methadone@2017')
            cy.get('button[type=submit]').click()
        })
    })

    describe('Quan Ly Benh Nhan', () => {
        it('Redirect ...', () => {
            cy.wait(delay)
            cy.visit('http://52.187.8.102/main/patients')
        })
        // it('Click Thêm don thuoc', function() {
        //     cy.wait(delay)
        //     cy.get('.actions.ng-scope a:nth-child(1)').click()
        // })
        // it('Them thong tin thuoc', function() {
        //     cy.wait(delay)
        //     cy.get('div[name=medicine_list_id]').click()
        //     cy.get('#ui-select-choices-row-14-1').click()

        //     cy.get('input[name=dosage]').type(`${100 - rand}`)
        //     cy.get('input[name=duration]').type(`${rand2}`)

        //     cy.get('textarea[name=description]').type(`Chữ Tiếng Việt ${rand}\nXuong dong Chữ Tiếng Việt ${rand}`)
        // })
        // it('Submit', function() {
        //     cy.get('.modal-footer button[type=submit]').first().click()
        // })
    })

    describe('Kiểm tra phần hiển thị của text trên view', function() {
        it('Click hien view', function() {
            cy.wait(delay)
            cy.get('.nav.nav-tabs li:nth-child(3)').click()
            cy.wait(delay)
            cy.get('.table-bordered tbody > tr td:nth-child(8) a').first().click()
        })
        it('Xuong dong ok', function() {
            cy.wait(delay)

            expect('foo\nbar').to.have.string('\r');
            // $('pre').should.have.html('\n');
        })
    })
})

// describe('Kiem tra textarea voi tai khoan doctor_10@gmail.com', () => {
//     describe('Login with account doctor_10@gmail.com', () => {
//         it('Login ...', () => {
//             cy.visit('http://52.187.8.102/signin')
//             cy.get('input[name=email]').type('doctor_10@gmail.com')
//             cy.get('input[name=password]').type('Methadone@2017')
//             cy.get('button[type=submit]').click()
//         })
//     })
    
//     describe('Quan Ly Benh Nhan', () => {
//         it('Redirect ...', () => {
//             cy.wait(delay)
//             cy.visit('http://52.187.8.102/main/patients')
//         })
//         it('Click Thêm don thuoc', function() {
//             cy.wait(delay)
//             cy.get('.actions.ng-scope a:nth-child(1)').click()
//         })
//         it('Them thong tin thuoc', function() {
//             cy.wait(delay)
//             cy.get('div[name=medicine_list_id]').click()
//             cy.get('#ui-select-choices-row-14-1').click()

//             cy.get('input[name=dosage]').type(`${100 - rand}`)
//             cy.get('input[name=duration]').type(`${rand2}`)

//             cy.get('textarea[name=description]').type(`Chữ Tiếng Việt ${rand}`)
//         })
//         it('Submit', function() {
//             cy.get('.modal-footer button[type=submit]').first().click()
//         })
//     })

//     describe('Kiểm tra phần hiển thị của text trên view', function() {
//         it('Có font-family', function() {
//             cy.wait(delay)
//             cy.get('.mt-content.border-grey-steel div:nth-child(2) > p:nth-child(1)').and('have.css', 'font-family')
            
//         })
//     })
// })