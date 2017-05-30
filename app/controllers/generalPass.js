var args = arguments[0] || {};

var ad = require('admob');

var addview;
if (OS_ANDROID) {
	addview = ad.addMob_android();
} else {
	addview = ad.addMob_iOS();
}

$.adView.add(addview);

function save() {
	var db = require('db');
	if ($.txt_title.getValue() == '' || $.txt_pass.getValue() == '') {

		alert('Pleae fill up minimum requirement');
	} else {

		db.add($.txt_title.getValue(), $.txt_email.getValue(), $.txt_pass.getValue(), $.txt_account.getValue(), $.txt_pin.getValue(), $.txt_url.getValue(), function(_callBacl) {
			if (_callBacl == 'success') {
				//alert(_callBacl);
				$.txt_title.setValue('');
				$.txt_email.setValue('');
				$.txt_pass.setValue('');
				$.txt_url.setValue('');
				$.txt_account.setValue('');
				$.txt_pin.setValue('');
				//Ti.App.fireEvent('update');
				Alloy.Events.trigger('updateMainUI');
				// $.genWin.close({
				// transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
				// });
				$.genWin.close();
				$.genWin == null;

			}

		});

	}

}

//
function back() {
	// $.genWin.close({
	// transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
	// });
	$.genWin.close();
}

//
