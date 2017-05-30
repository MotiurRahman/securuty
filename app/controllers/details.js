var args = arguments[0] || {};


var ad = require('admob');

var addview;
if (OS_ANDROID) {
	addview = ad.addMob_android();
} else {
	addview = ad.addMob_iOS();
}

$.adView.add(addview); 


//alert("Title:"+args.title);

$.title.setText('Title: ' + args.title);
$.email.setText('Email: ' + args.email);
$.pass.setText('Password: ' + args.pass);
$.site.setText("URL:" + "https://www."+args.url);
$.account.setText('Account: ' + args.account);
$.pin.setText('Pin: ' + args.pin);

function openURL() {
	Ti.Platform.openURL(args.url);
}

function close() {
	$.detailWin.close();
	$.detailWin = null;
}

function update() {
	$.detailWin.close();
	$.detailWin = null;
	Alloy.createController('update', args).getView().open();

}

function deleteBtn() {
	var db = require('db');
	var dialog = Ti.UI.createAlertDialog({
		buttonNames : ['Confirm', 'Cancel'],
		message : 'Would you like to delete the file?',
		title : 'Delete'
	});
	dialog.addEventListener('click', function(e) {
		if (e.index === 0) {
			db.deletinfo(args.id);
			Alloy.Events.trigger('updateMainUI');
			$.detailWin.close();
			$.detailWin = null;
		}

	});
	dialog.show();

}

