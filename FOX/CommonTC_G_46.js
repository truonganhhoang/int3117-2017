describe('Kiểm tra TextArea', function () {
	describe('CommonTC_G_46 Kiểm tra giá trị mặc định', function () {
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

				it('TextArea Tìm kiếm...', function () {
					cy.get('div.input-icon input.form-control').click().should('empty');
				});
				describe('Tạo tài khoản trưởng cơ sở', function () {
					it('Thêm...', function () {
						cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
					});

					it('TextArea Email...', function () {
						cy.get('div.modal-dialog input[name=email]').should('empty');
					});
					it('TextArea Password...', function () {
						cy.get('div.modal-dialog input[name=password]').should('empty');
					});
					it('TextArea Họ...', function () {
						cy.get('div.modal-dialog input[name=first_name]').should('empty');
					});
					it('TextArea Tên...', function () {
						cy.get('div.modal-dialog input[name=last_name]').should('empty');
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

				it('TextArea Tìm kiếm...', function () {
					cy.get('div.input-icon input.form-control').click().should('empty');
				});
				describe('Tạo đơn vị điều trị', function () {
					it('Thêm...', function () {
						cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
					});

					it('TextArea Tên...', function () {
						cy.get('div.modal-dialog input[name=name]').should('empty');
					});
					it('TextArea Địa chỉ...', function () {
						cy.get('div.modal-dialog input[name=address]').should('empty');
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

					it('TextArea Tên nghề nghiệp...', function () {
						cy.get('form[ng-submit="search()"] > input.form-control').should('empty');
					});
					describe('Thêm nghề nghiệp', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
						});

						it('TextArea Tên nghề nghiệp...', function () {
							cy.get('div.modal-dialog input[name=name]').should('empty');
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

					it('TextArea Tên tình trạng hôn nhân...', function () {
						cy.get('form[ng-submit="search()"] > input.form-control').should('empty');
					});
					describe('Thêm tình trạng hôn nhân', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
						});

						it('TextArea Tên tình trạng hôn nhân...', function () {
							cy.get('div.modal-dialog input[name=name]').should('empty');
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

					it('TextArea Tên tình hình tài chính...', function () {
						cy.get('form[ng-submit="search()"] > input.form-control').should('empty');
					});
					describe('Thêm tình hình tài chính', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
						});

						it('TextArea Từ...', function () {
							cy.get('div.modal-dialog input[name=fromfinancial]').should('empty');
						});
						it('TextArea Đến...', function () {
							cy.get('div.modal-dialog input[name=tofinancial]').should('empty');
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

					it('TextArea Trình độ học vấn...', function () {
						cy.get('form[ng-submit="search()"] > input.form-control').should('empty');
					});
					describe('Thêm trình độ học vấn', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
						});

						it('TextArea  Trình độ học vấn...', function () {
							cy.get('div.modal-dialog input[name=name]').should('empty');
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

					it('TextArea Lý do...', function () {
						cy.get('form[ng-submit="search()"] > input.form-control').should('empty');
					});
					describe('Thêm lý do', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
						});

						it('TextArea Tên...', function () {
							cy.get('div.modal-dialog input[name=name]').should('empty');
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

					it('TextArea Tên hoặc thành phần thuốc...', function () {
						cy.get('form[ng-submit="search()"] > input.form-control').should('empty');
					});
					describe('Thêm thuốc', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
						});

						it('TextArea Tên thuốc...', function () {
							cy.get('div.modal-dialog input[name=name]').should('empty');
						});
						it('TextArea Thành phần...', function () {
							cy.get('div.modal-dialog input[name=composition]').should('empty');
						});
						it('TextArea Hàm lượng / Nồng độ...', function () {
							cy.get('div.modal-dialog input[name=concentration]').should('empty');
						});
						it('TextArea Quy cách đóng gói...', function () {
							cy.get('div.modal-dialog input[name=packing]').should('empty');
						});
						it('TextArea Đơn vị tính...', function () {
							cy.get('div.modal-dialog input[name=unit]').should('empty');
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

					it('TextArea Tên nhà sản xuất...', function () {
						cy.get('form[ng-submit="search()"] > input.form-control').should('empty');
					});
					describe('Thêm nhà sản xuất (note chỗ này giao diện sai tên nhãn)', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
						});

						it('TextArea Tên...', function () {
							cy.get('div.modal-dialog input[name=name]').should('empty');
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

					it('TextArea Tên Nhà phân phối...', function () {
						cy.get('form[ng-submit="search()"] > input.form-control').should('empty');
					});
					describe('Thêm Nhà phân phối', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
						});

						it('TextArea Tên...', function () {
							cy.get('div.modal-dialog input[name=name]').should('empty');
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

					it('TextArea Tên nguồn thuốc...', function () {
						cy.get('form[ng-submit="search()"] > input.form-control').should('empty');
					});
					describe('Thêm nguồn thuốc', function () {
						it('Thêm...', function () {
							cy.get('a.ng-binding.btn i.fa-plus').click().wait(1000);
						});

						it('TextArea Tên nguồn thuốc...', function () {
							cy.get('div.modal-dialog input[name=name]').should('empty');
						});

						it('Đóng...', function () {
							cy.get('div.modal-dialog input[type=button]').click().should('not.exist');
						});
					});
				});
			});
			
			describe('Quản lý bệnh nhân', function () {
				it('Chuyển trang...', function () {
					cy.get('li.nav-item > a[ui-sref="main.patients"]').click().wait(1000);
				});

				it('TextArea Tìm kiếm...', function () {
					cy.get('div.input-icon input.form-control').click().should('empty');
				});
				describe('Tìm kiếm nâng cao', function () {
					it('Nâng cao...', function () {
						cy.get('div.inputs > button.btn > i.fa-search').click().wait(1000);
					});

					it('TextArea Số...', function () {
						cy.get('div.modal-dialog input[name=identification_number]').should('empty');
					});
					it('TextArea Họ và tên...', function () {
						cy.get('div.modal-dialog input[name=name]').should('empty');
					});
					it('TextArea Ngày sinh từ ngày...', function () {
						cy.get('div.modal-dialog input[name=birthdate_from]').should('empty');
					});
					it('TextArea Đến ngày...', function () {
						cy.get('div.modal-dialog input[name=birthdate_to]').should('empty');
					});
					it('TextArea Ngày vào điều trị từ ngày...', function () {
						cy.get('div.modal-dialog input[name=admission_date_from]').should('empty');
					});
					it('TextArea Đến ngày...', function () {
						cy.get('div.modal-dialog input[name=admission_date_to]').should('empty');
					});

					it('Đóng...', function () {
						cy.get('div.modal-dialog input[type=button]').click().should('hidden');
					});
				});
			});

			describe('Báo cáo tổng hợp', function () {
				it('Chuyển trang...', function () {
					cy.get('li.nav-item > a[ui-sref="main.summary_report"]').click().wait(1000);
				});

				it('TextArea Từ ngày...', function () {
					cy.get('input[name="from_date"]').should('empty');
				});
				it('TextArea Đến ngày...', function () {
					cy.get('input[name="to_date"]').should('empty');
				});
			});

		});
	});
});
