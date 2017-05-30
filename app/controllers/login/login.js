var args = arguments[0] || {};

function save() {
	var db = require('loginDB');
	function checkEmail() {

		var email = $.txt_email.getValue();
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if (!filter.test(email)) {

			if (OS_ANDROID) {
				var toast = Ti.UI.createNotification({
					message : 'Please provide a valid email address',
					duration : Ti.UI.NOTIFICATION_DURATION_LONG
				});
				toast.show();
			} else {
				alert('Please provide a valid email address');
			}

			return false;
		} else {
			return true;
		}
	}

	if ($.txt_newPass.getValue() == '' || $.txt_email.getValue() == '' || $.re_pass.getValue() == '') {

		if (OS_ANDROID) {
			var toast = Ti.UI.createNotification({
				message : 'Pleae fill up minimum requirement',
				duration : Ti.UI.NOTIFICATION_DURATION_LONG
			});
			toast.show();
		} else {
			alert('Pleae fill up minimum requirement');
		}

	} else {

		if ($.txt_newPass.getValue() == $.re_pass.getValue()) {

			if (checkEmail() == true) {

				db.add($.txt_newPass.getValue(), $.txt_email.getValue(), function(e) {
					if (e == 'success') {
						$.txt_newPass.setValue("");
						$.re_pass.setValue("");
						$.txt_email.getValue("");

						if (OS_ANDROID) {
							var toast = Ti.UI.createNotification({
								message : 'Password create Successfully',
								duration : Ti.UI.NOTIFICATION_DURATION_LONG
							});
							toast.show();
						} else {
							alert('Password create Successfully');
						}
					}

					$.loginWin.close();
					$.loginWin == null;

				});
			}

		} else {

			if (OS_ANDROID) {
				var toast = Ti.UI.createNotification({
					message : 'password does not match',
					duration : Ti.UI.NOTIFICATION_DURATION_LONG
				});
				toast.show();
			} else {
				alert('password does not match');
			}

		}

	}
}

function back() {
	$.loginWin.close();
}
