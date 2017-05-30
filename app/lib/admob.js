var Admob = require('ti.admob');

exports.addMob_iOS = function() {
	var ad = Admob.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		//debugEnabled : true, // If enabled, a dummy value for `adUnitId` will be used to test
		adUnitId : 'ca-app-pub-4951262838901192/8903552669', // You can get your own at http: //www.admob.com/
		adBackgroundColor : 'black',
		//testDevices : "ec15d5934a8413d7ae33c7e2f871eba5", // You can get your device's id by looking in the console log
		dateOfBirth : new Date(1985, 10, 1, 12, 1, 1),
		gender : Admob.GENDER_MALE, // GENDER_MALE or GENDER_FEMALE, default: undefined
		contentURL : 'https://admob.com', // URL string for a webpage whose content matches the app content.
		requestAgent : 'Titanium Mobile App', // String that identifies the ad request's origin.
		extras : {// Object of additional infos
			"version" : 1.0,
			"name" : "PasswordManager"
		},
		tagForChildDirectedTreatment : false, // http:///business.ftc.gov/privacy-and-security/childrens-privacy for more infos
		keywords : ['password manager', 'password security manager']
	});

	ad.addEventListener('didReceiveAd', function() {
		Ti.API.info('Did receive ad!');
	});

	return ad;
};

exports.addMob_android = function() {
	// then create an adMob view
	var adMobView = Admob.createView({
		publisherId : "ca-app-pub-4951262838901192/5810485462",
		testing : false, // default is false
		//top: 10, //optional
		//left: 0, // optional
		//right: 0, // optional
		//bottom : 0, // optional
		adBackgroundColor : "FF8855", // optional
		backgroundColorTop : "738000", //optional - Gradient background color at top
		borderColor : "#000000", // optional - Border color
		textColor : "#000000", // optional - Text color
		urlColor : "#00FF00", // optional - URL color
		linkColor : "#0000FF" //optional -  Link text color

	});

	return adMobView;

};
