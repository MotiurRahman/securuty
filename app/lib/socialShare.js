exports.twiterShare = function(tweet, callback) {

	var social = require('alloy/social');

	var twitt = social.create({
		consumerSecret : 'R1nZWFNWH1fH6BibTQYtzQQClaT0zqYGReIIchcIpPO6rE3ycY',
		consumerKey : 'vWJ43JxWN070GnvkdJWMrUpaw'
	});

	// If not authorized, get authorization from the user

	if (!twitt.isAuthorized()) {
		twitt.authorize();
	}

	var webLink;

	if (OS_IOS) {

		webLink = "https://itunes.apple.com/us/app/password-security-manager/id1070748246?ls=1&mt=8";

	} else {
		webLink = "https://play.google.com/store/apps/details?id=com.bd.PasswordManager";
	}

	twitt.share({
		message : tweet + '\n' + "PasswordManager:" + webLink,
		success : function(e) {
			callback('tweeted!');
		},
		error : function(e) {
			callback('Error!');
		}
	});

	// Deauthorize the application
	//twitt.deauthorize();

};

exports.facebookShare = function() {
	var fb = require('facebook');
	fb.initialize();
	var webLink = null;

	if (OS_IOS) {

		webLink = "https://itunes.apple.com/us/app/password-security-manager/id1070748246?ls=1&mt=8";

	} else {
		webLink = "https://play.google.com/store/apps/details?id=com.bd.PasswordManager";
	}

	fb.addEventListener('shareCompleted', function(e) {
		if (e.success) {
			Ti.API.info('Share request succeeded.');
		} else {
			Ti.API.info('Failed to share.');
		}
	});

	fb.presentShareDialog({
		link : webLink,
		//title : title,
		description : 'Password Manager is a great password saving App.',
		picture : 'http://oi65.tinypic.com/mii974.jpg',
		mode : fb.SHARE_DIALOG_MODE_AUTOMATIC

	});

};

exports.linkdinShare = function(linkdinComment, callback) {
	var social = require('social');
	var linkedin = social.create({
		consumerSecret : "zE9vCtP6FxTlhqGt",
		consumerKey : "755nw0qgrlyvrx",
		site : 'linkedin'
	});
	linkedin.authorize();

	var webLink;

	if (OS_IOS) {

		webLink = "https://itunes.apple.com/us/app/password-security-manager/id1070748246?ls=1&mt=8";

	} else {
		webLink = "https://play.google.com/store/apps/details?id=com.bd.PasswordManager";
	}

	var messageContent = {
		"comment" : linkdinComment,
		"content" : {
			"title" : "Password Manager",
			"submitted_url" : webLink,
			"description" : "This App can save and show general and bank account information easily."
		},
		"visibility" : {
			"code" : "anyone"
		}
	};
	linkedin.shareToLinkedin({
		message : messageContent,
		success : function() {
			callback("Linkedin Posted Successfully");
		},
		error : function() {
			callback("Error while posting");
		}
	});
};

exports.whatsappShare = function() {

	var url = encodeURIComponent("https://itunes.apple.com/us/app/password-security-manager/id1070748246?ls=1&mt=8").replace(/'/g, "%27").replace(/"/g, "%22");

	var whatsappUrl = 'whatsapp://send?text=' + url;

	if (OS_IOS) {

		if (Ti.Platform.canOpenURL(whatsappUrl)) {

			Ti.Platform.openURL(whatsappUrl);

		} else {

			Ti.Platform.openURL("https://itunes.apple.com/ae/app/whatsapp-messenger/id310633997?mt=8");

		}

	} else {

		var url = 'https://play.google.com/store/apps/details?id=com.bd.PasswordManager';

		var AndroidUrl = 'whatsapp://send?text=' + url;

		var isSuccess = Ti.Platform.openURL(AndroidUrl);

		if (!isSuccess) {
			Ti.Platform.openURL("market://details?id=com.whatsapp&hl=en");

		}

	}

};

