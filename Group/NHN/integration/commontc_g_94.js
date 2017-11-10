var listScreen = [ {email: 'admin_10@gmail.com', 
				    availableScreens: ['/main/admin/administrators', '/main/admin/administrators/issuing_agency', '/main/admin/administrators/employments', 
				  					   '/main/admin/administrators/maritals', '/main/admin/administrators/financials', '/main/admin/administrators/educations', 
				  					   '/main/admin/administrators/stop_reasons', '/main/admin/administrators/medicine_list', '/main/admin/administrators/manufacturers', 
									   '/main/admin/administrators/providers', '/main/admin/administrators/sources']},
				   {email: 'admin_agency_10@gmail.com',
					availableScreens: ['/main/admin_agency/users', '/main/patients/360/detail/executive_info', '/main/patients/360/detail/info',
									   '/main/patients/360/detail/prescription', '/main/patients/360/detail/change_agency_info', '/main/patients/new',
									   '/main/patients/360/edit']},
				   {email: 'doctor_10@gmail.com',
				    availableScreens: ['/main/patients/360/detail/executive_info', '/main/patients/360/detail/info', '/main/patients/360/detail/prescription',
				    				   '/main/patients/360/detail/change_agency_info', '/main/patients/new', '/main/patients/360/edit']},
				   {email: 'nurse_10@gmail.com',
					availableScreens: ['/main/nurses/patients/359/medicine_allocation', '/main/history_falled', '/main/give_up_report',
									   '/main/lost_report', '/main/redundancy_report', '/main/redundancy_lost_report',
									   '/main/sub_medicines', '/main/delivery_sub_vouchers', '/main/received_sub_vouchers']},
				   {email: 'storekeeper_10@gmail.com',
					availableScreens: ['/main/medicine', '/main/delivery_vouchers/26/medicines', '/main/received_vouchers/25/medicines',
									   '/main/received_end_day_vouchers/28/medicines', '/main/check_received_stock_report', '/main/medicine_allocations_report',
									   '/main/report_today', '/main/situation_report', '/main/import_export_medicine',
									   '/main/card_store', '/main/situation_use']}];


describe('Check radio button behavior', function() {

	it('Radio for Admin', function() {
		checkRadio(0);
	})

	it('Radio for Agency admin', function() {
		checkRadio(1);
	})

	it('Radio for Doctor', function() {
		checkRadio(2);
	})

	it('Radio for Nurse', function() {
		checkRadio(3)
	})

	it('Radio for Storekeeper', function() {
		checkRadio(4)
	})

	it('Radio in common test', function() {
		cy.visit(Cypress.env('URL_LOGIN'));
		cy.get('input[name=email]').type('admin_10@gmail.com');
		cy.get('input[name=password]').type('Methadone@2017{enter}');

		cy.wait(1234);
		cy.visit(Cypress.env('URL_COMMON_TEST'));

		if (Cypress.$('input[type=radio]').length != 0) {
			cy.get('input[type="radio"]').each(function($li, id, $list) {
				cy.wrap($li).click();
				cy.wrap($li).filter('.ng-valid-parse');

				for (var i = 0; i < $list.length; ++i) {
					if (i != id) {
						cy.wrap($list[i]).filter('.ng-not-empty');
					}
				}
			})
		}
	})

})

function checkRadio(screenIndex) {
	cy.clearCookies();
	cy.visit(Cypress.env('URL_LOGIN'));

	cy.get('input[name=email]').type(Cypress.env('list_screen')[screenIndex].email);
	cy.get('input[name=password]').type('Methadone@2017{enter}');

	cy.wait(1234);

	var availableScreens = Cypress.env('list_screen')[screenIndex].availableScreens;
	for (var j = 0; j < availableScreens.length; ++j) {
		cy.visit(Cypress.env('URL_LOGIN') + availableScreens[j]);
		cy.wait(1234);

		
		if (Cypress.$('input[type=radio]').length != 0) {
			cy.get('input[type="radio"]').each(function($li, id, $list) {
				cy.wrap($li).click();
				cy.wrap($li).filter('.ng-valid-parse');

				for (var i = 0; i < $list.length; ++i) {
					if (i != id) {
						cy.wrap($list[i]).filter('.ng-not-empty');
					}
				}
			})
		}
		
	}
}