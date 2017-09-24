describe('Kiểm tra TextArea', function () {
	describe('CommonTC_G_47 Kiểm tra dữ liệu là bắt buộc nhập', function () {
		describe('Tài khoản quản trị hệ thống', function () {
			it('Đăng nhập...', function () {
				cy.visit(Cypress.env('URL_LOGIN'));
				cy.get('input[name=email]').type(Cypress.env('USER_ADMIN'));
				cy.get('input[name=password]').type(Cypress.env('LOGIN_PASSWORD'));
				cy.get('button[type=submit]').click().should('not.exist');
			});

			describe('Quản lý người dùng', function () {
				it('Chuyển trang...', function () {
					cy.get('li.nav-item > a[ui-sref="main.administrators"]').click().wait(1000);
				});

				describe('Tạo tài khoản trưởng cơ sở', function () {
					it('Thêm...', function () {
						cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
						cy.get('div.modal-dialog input[name=email]').type('padding'.repeat(50) + '@email.com');
						cy.get('div.modal-dialog input[name=password]').type('padding'.repeat(50));
						cy.get('div.modal-dialog input[name=first_name]').type('padding'.repeat(50));
						cy.get('div.modal-dialog input[name=last_name]').type('padding'.repeat(50));
						cy.get('div.modal-dialog button[type=submit]').click();
					});

					it('TextArea Email...', function () {
						cy.get('div.modal-dialog input[name=email] + div.text-error').should('visible');
					});
					it('TextArea Password...', function () {
						cy.get('div.modal-dialog input[name=password] + div.text-error').should('visible');
					});
					it('TextArea Họ...', function () {
						cy.get('div.modal-dialog input[name=first_name] + div.text-error').should('visible');
					});
					it('TextArea Tên...', function () {
						cy.get('div.modal-dialog input[name=last_name] + div.text-error').should('visible');
					});

					it('Đóng...', function () {
						cy.get('div.modal-dialog input[type=button]').click().should('not.exist');
					});
				});
			});

			describe('Quản lý cơ sở', function () {
				it('Chuyển trang...', function () {
					cy.get('li.nav-item > a[ui-sref="main.issuing_agency"]').click().wait(1000);
				});

				describe('Tạo đơn vị điều trị', function () {
					it('Thêm...', function () {
						cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
						cy.get('div.modal-dialog input[name=name]').type('padding'.repeat(50));
						cy.get('div.modal-dialog input[name=address]').type('padding'.repeat(50));
						cy.get('div.modal-dialog button[type=submit]').click();
					});

					it('TextArea Tên...', function () {
						cy.get('div.modal-dialog input[name=name] + div.text-error').should('visible');
					});
					it('TextArea Địa chỉ...', function () {
						cy.get('div.modal-dialog input[name=address] + div.text-error').should('visible');
					});

					it('Đóng...', function () {
						cy.get('div.modal-dialog input[type=button]').click().should('not.exist');
					});
				});
			});

			describe('Quản lý danh mục', function () {
				it('Chuyển trang...', function () {
					cy.get('div.page-logo > div.menu-toggler').click();
					cy.get('li.nav-item > a.nav-link > i.icon-folder').click();
				});

				describe('Danh mục nghề nghiệp', function () {
					it('Chuyển trang...', function () {
						cy.get('li.nav-item > ul.sub-menu > li.nav-item > a[ui-sref="main.employments"]').click().wait(1000);
					});

					describe('Thêm nghề nghiệp', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
							cy.get('div.modal-dialog input[name=name]').type('padding'.repeat(50));
							cy.get('div.modal-dialog button[type=submit]').click();
						});

						it('TextArea Tên nghề nghiệp...', function () {
							cy.get('div.modal-dialog input[name=name] + div.text-error').should('visible');
						});

						it('Đóng...', function () {
							cy.get('div.modal-dialog input[type=button]').click().should('not.exist');
						});
					});
				});

				describe('Danh mục hôn nhân', function () {
					it('Chuyển trang...', function () {
						cy.get('li.nav-item > ul.sub-menu > li.nav-item > a[ui-sref="main.maritals"]').click().wait(1000);
					});

					describe('Thêm tình trạng hôn nhân', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
							cy.get('div.modal-dialog input[name=name]').type('padding'.repeat(50));
							cy.get('div.modal-dialog button[type=submit]').click();
						});

						it('TextArea Tên tình trạng hôn nhân...', function () {
							cy.get('div.modal-dialog input[name=name] + div.text-error').should('visible');
						});

						it('Đóng...', function () {
							cy.get('div.modal-dialog input[type=button]').click().should('not.exist');
						});
					});
				});

				describe('Danh mục tài chính', function () {
					it('Chuyển trang...', function () {
						cy.get('li.nav-item > ul.sub-menu > li.nav-item > a[ui-sref="main.financials"]').click().wait(1000);
					});

					describe('Thêm tình hình tài chính', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
							cy.get('div.modal-dialog input[name=fromfinancial]').type('padding'.repeat(50));
							cy.get('div.modal-dialog input[name=tofinancial]').type('padding'.repeat(50));
							cy.get('div.modal-dialog button[type=submit]').click();
						});

						it('TextArea Từ...', function () {
							cy.get('div.modal-dialog input[name=fromfinancial] + div.text-error').should('visible');
						});
						it('TextArea Đến...', function () {
							cy.get('div.modal-dialog input[name=tofinancial] + div.text-error').should('visible');
						});

						it('Đóng...', function () {
							cy.get('div.modal-dialog input[type=button]').click().should('not.exist');
						});
					});
				});

				describe('Danh mục trình độ học vấn', function () {
					it('Chuyển trang...', function () {
						cy.get('li.nav-item > ul.sub-menu > li.nav-item > a[ui-sref="main.educations"]').click().wait(1000);
					});

					describe('Thêm trình độ học vấn', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
							cy.get('div.modal-dialog input[name=name]').type('padding'.repeat(50));
							cy.get('div.modal-dialog button[type=submit]').click();
						});

						it('TextArea  Trình độ học vấn...', function () {
							cy.get('div.modal-dialog input[name=name] + div.text-error').should('visible');
						});

						it('Đóng...', function () {
							cy.get('div.modal-dialog input[type=button]').click().should('not.exist');
						});
					});
				});

				describe('Danh mục lý do ngừng điều trị', function () {
					it('Chuyển trang...', function () {
						cy.get('li.nav-item > ul.sub-menu > li.nav-item > a[ui-sref="main.stop_reasons"]').click().wait(1000);
					});

					describe('Thêm lý do', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
							cy.get('div.modal-dialog input[name=name]').type('padding'.repeat(50));
							cy.get('div.modal-dialog button[type=submit]').click();
						});

						it('TextArea Tên...', function () {
							cy.get('div.modal-dialog input[name=name] + div.text-error').should('visible');
						});

						it('Đóng...', function () {
							cy.get('div.modal-dialog input[type=button]').click().should('not.exist');
						});
					});
				});

				describe('Danh mục thuốc', function () {
					it('Chuyển trang...', function () {
						cy.get('li.nav-item > ul.sub-menu > li.nav-item > a[ui-sref="main.medicine_list"]').click().wait(1000);
					});

					describe('Thêm thuốc', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
							cy.get('div.modal-dialog input[name=name]').type('padding'.repeat(50));
							cy.get('div.modal-dialog input[name=composition]').type('padding'.repeat(50));
							cy.get('div.modal-dialog input[name=unit]').type('padding'.repeat(50));
							cy.get('div.modal-dialog button[type=submit]').click();
						});

						it('TextArea Tên thuốc...', function () {
							cy.get('div.modal-dialog input[name=name] + div.text-error').should('visible');
						});
						it('TextArea Thành phần...', function () {
							cy.get('div.modal-dialog input[name=composition] + div.text-error').should('visible');
						});
						it('TextArea Đơn vị tính...', function () {
							cy.get('div.modal-dialog input[name=unit] + div.text-error').should('visible');
						});

						it('Đóng...', function () {
							cy.get('div.modal-dialog input[type=button]').click().should('not.exist');
						});
					});
				});

				describe('Danh mục nhà sản xuất', function () {
					it('Chuyển trang...', function () {
						cy.get('li.nav-item > ul.sub-menu > li.nav-item > a[ui-sref="main.manufacturers"]').click().wait(1000);
					});

					describe('Thêm nhà sản xuất (note chỗ này giao diện sai tên nhãn)', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
							cy.get('div.modal-dialog input[name=name]').type('padding'.repeat(50));
							cy.get('div.modal-dialog button[type=submit]').click();
						});

						it('TextArea Tên...', function () {
							cy.get('div.modal-dialog input[name=name] + div.text-error').should('visible');
						});

						it('Đóng...', function () {
							cy.get('div.modal-dialog input[type=button]').click().should('not.exist');
						});
					});
				});

				describe('Danh mục nhà phân phối', function () {
					it('Chuyển trang...', function () {
						cy.get('li.nav-item > ul.sub-menu > li.nav-item > a[ui-sref="main.providers"]').click().wait(1000);
					});

					describe('Thêm Nhà phân phối', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
							cy.get('div.modal-dialog input[name=name]').type('padding'.repeat(50));
							cy.get('div.modal-dialog button[type=submit]').click();
						});

						it('TextArea Tên...', function () {
							cy.get('div.modal-dialog input[name=name] + div.text-error').should('visible');
						});

						it('Đóng...', function () {
							cy.get('div.modal-dialog input[type=button]').click().should('not.exist');
						});
					});
				});

				describe('Danh mục nguồn thuốc', function () {
					it('Chuyển trang...', function () {
						cy.get('li.nav-item > ul.sub-menu > li.nav-item > a[ui-sref="main.sources"]').click().wait(1000);
					});

					describe('Thêm nguồn thuốc', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
							cy.get('div.modal-dialog input[name=name]').type('padding'.repeat(50));
							cy.get('div.modal-dialog button[type=submit]').click();
						});

						it('TextArea Tên nguồn thuốc...', function () {
							cy.get('div.modal-dialog input[name=name] + div.text-error').should('visible');
						});

						it('Đóng...', function () {
							cy.get('div.modal-dialog input[type=button]').click().should('not.exist');
						});
					});
				});
			});
		});
	});
});
