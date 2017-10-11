/**
 * Created by locdt on 07/10/2017.
 */
const admin = require("../support/role/admin.json");
const doctor = require("../support/role/doctor.json");
const nurse = require("../support/role/nurse.json");
const storekeeper = require("../support/role/storekeeper.json")

const users = [];
users.push(admin);
users.push(doctor);
users.push(nurse);
users.push(storekeeper);

describe('Common TC_GUI', function () {
	console.log("describle");
	console.log (users);
	
	let isValid = function(variable) {
		return (variable != null && variable != undefined && variable != ""
		|| (typeof variable === "number" && variable != NaN))
	};
	
	function assert(casename) {
		context(casename, function() {
			users.forEach(user => {
				user.urls.forEach(url => {
					if (url.form == "" || url.form == undefined)
						return;
					
					let form = url.form;
					
					form.inputs.forEach(input => {
						it(url.path + " | " + input.selector, function() {
							cy.visit("/signin");
							cy.doLoginAs(user);
							
							cy.visit(url.path);
							if (form.modal != undefined && form.modal != "")
								cy.get('a[ng-click="' + form.modal + '"]').first().click();
							
							// Điền trước các input cần thiết
							cy.prepareFormData(form, input);
							
							let assertion = input.testcase[casename];
							let inputValue;
							
							console.log(assertion);
							if (!isValid(assertion.value)) {
								if (isValid(assertion.depend)) {
									cy.get(assertion.depend).then($depend => {
										let inputValue = parseInt($depend.text());
										let modify = assertion.modify;
										inputValue += modify == undefined ? 0 : modify;
										cy.typeNumber(input.selector, inputValue);
									});
								}
								else {
									let min = null, max = null;
									
									if (typeof assertion.min === "number")
										min = assertion.min;
									else {
										cy.get(assertion.min.depend).then($depend => {
											if (min == null) {
												min = parseInt($depend.text());
												let modify = assertion.min.modify;
												min += modify == undefined ? 0 : modify;
											}
										});
										console.log("min: " + min);
									}
									
									if (typeof assertion.max === "number")
										max = assertion.max;
									else {
										cy.get(assertion.max.depend).then($depend => {
											if (max == null) {
												console.log($depend.text());
												max = parseInt($depend.text());
												let modify = assertion.max.modify;
												max += modify == undefined ? 0 : modify;
												return max;
											}
										}).then(max => {
											cy.doRandInt(min, max)
												.then(value => cy.typeNumber(input.selector, 2));
										})
									}
								}
							}
							else cy.typeNumber(input.selector, assertion.value);
							
							cy.assert(assertion);
						});
					});
				});
			});
		});
    }
	
	assert('Common_TC_G_28');
	assert('Common_TC_G_29');
	assert('Common_TC_G_30');
	assert('Common_TC_G_31');
	assert('Common_TC_G_32');

    
    // // dien nho hon lieu luong cho phep
    // it('Common_TC_G_29', function() {
		// assert('Common_TC_G_29');
    //     // dosageMustBeFocused()
    // });
    //
    // // dien lieu luong nho nhat cho phep
    // it('Common_TC_G_30', function() {
		// assert('Common_TC_G_30');
    // });
    //
    // // dien lieu luong lon nhat cho phep
    // it('Common_TC_G_32', function() {
		// assert('Common_TC_G_32');
    // });
    //
    // // dien lieu luong nam trong khoang cho phep
    // it('Common_TC_G_31', function() {
    //
    // });
});
