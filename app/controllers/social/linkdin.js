var args = arguments[0] || {};

var ad = require('admob');

var addview;
if (OS_ANDROID) {
	addview = ad.addMob_android();
} else {
	addview = ad.addMob_iOS();
}

$.adView.add(addview);

function send() {
	var linkdin = $.txt_comment.getValue();
	if (linkdin == '') {
		alert("Please write something.");

	} else {

		if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {

			if (OS_ANDROID) {
				var toast = Ti.UI.createNotification({
					message : "Please connect to the internet!",
					duration : Ti.UI.NOTIFICATION_DURATION_LONG
				});
				toast.show();
			} else {
				alert("Please connect to the internet!");
			}

		} else {
			var link = require('socialShare');
			link.linkdinShare(linkdin, function(callback) {
				alert(callback);
				$.txt_comment.setValue("");
				$.linkdinWin.close();
			});
		}

	}

}

function back() {
	$.linkdinWin.close();
}

