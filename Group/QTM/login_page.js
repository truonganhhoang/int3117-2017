describe('Kiểm thử trang login', function() {

  context('Form login', function(){
    beforeEach(function(){
      cy.visit('http://52.187.8.102/signin')
    })

    it('Không điền email', function(){
      cy.get('input[name=password]').type('password123{enter}')

      cy.get('.login-form')
        .find("div[ng-message]")
        .should("contain", 'Trường này không được để trống.')

      cy.url().should('include', '/signin')
    })

    it('Không điền mật khẩu', function(){
      cy.get('input[name=email]').type('doctor@gmail.com')
      cy.get('button').click();
      cy.get('.login-form')
        .find("div[ng-message]")
        .should("contain", 'Trường này không được để trống.')

      cy.url().should('include', '/signin')
    })

    it('Không điền mật khẩu và email', function(){
      cy.get('button').click();

      cy.get('.login-form')
        .find("div[ng-message]").first()
        .should("contain", 'Trường này không được để trống.')

      cy.get('.login-form')
        .find("div[ng-message]").last()
        .should("contain", 'Trường này không được để trống.')

      cy.url().should('include', '/signin')
    })

    it('Email sai định dạng', function(){
      cy.get('input[name=email]').type('email')
      cy.get('input[name=password]').type('password123{enter}')

      cy.get('.login-form')
        .find("div[ng-message]")
        .should("contain", 'Email không đúng định dạng.')

      cy.url().should('include', '/signin')
    })

    it('Đăng nhập không thành công', function(){
      cy.get('input[name=email]').type('doctor_10@gmail.com')
      cy.get('input[name=password]').type('password123{enter}')

      cy.url().should('include', '/signin')
    })

     it('Đăng nhập thành công', function(){
      cy.get('input[name=email]').type('doctor_10@gmail.com')
      cy.get('input[name=password]').type('Methadone@2017{enter}')

      cy.url().should('include', '/main/doctor/dashboard')
    })

  })
})
