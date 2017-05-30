var animationView = require('/animation');
//Minor changes to click event. Update the menuOpen status;
var value = true;
var self = $.mainView;

$.menuButtonLeft.addEventListener('click', function() {

	animationView.animat(self, value, function(e) {
		value = e;
		//alert(e);
	});
});
// method is exposed by widget

$.menuButtonRight.addEventListener('click', function() {

	if (OS_ANDROID) {
		Alloy.createController('generalPass').getView().open();
	} else {
		Alloy.createController('generalPass').getView().open({
			transition : Ti.UI.iOS.AnimationStyle.FLIP_FROM_LEFT
		});
	}

});

function refresh() {

	var db = require('db');

	var items = [];

	var data = db.getinfo();

	function heightValue() {
		var osname = Ti.Platform.osname,
		    version = Ti.Platform.version,
		    height = Ti.Platform.displayCaps.platformHeight,
		    width = Ti.Platform.displayCaps.platformWidth;

		//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
		//yourself what you consider a tablet form factor for android
		var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));

		var rowHeight;

		if (isTablet) {
			rowHeight = 70;
		} else {
			rowHeight = 40;
		}

		return rowHeight;
	}

	for (var i = 0; i < data.length; i++) {
		Ti.API.info(data[i].title);
		items.push({
			properties : {
				id : data[i].id,
				title : data[i].title,
				email : data[i].email,
				pass : data[i].pass,
				account : data[i].account,
				pin : data[i].pin,
				url : data[i].url,
				searchableText : data[i].title,
				font : {
					fontSize : 25

				},
				// height : heightValue(),
				backgroundGradient : {
					type : 'linear',
					startPoint : {
						x : '0%',
						y : '0%'
					},
					endPoint : {
						x : '0%',
						y : '100%'
					},
					colors : [{
						color : '#0091EA',
						offset : 0.0
					}, {
						color : '#0277BD',
						offset : 0.5
					}]
				},
				color : (OS_ANDROID) ? "#fff" : "#000",

			}
		});

	}

	$.elementsList.sections[0].setItems(items);
}

refresh();

//Ti.App.addEventListener('update', refresh);
Alloy.Events.on('updateMainUI', refresh);

var ad = require('admob');

var addview;
if (OS_ANDROID) {
	addview = ad.addMob_android();
} else {
	addview = ad.addMob_iOS();
}

$.adView.add(addview);

$.elementsList.addEventListener('itemclick', function(e) {
	var section = $.elementsList.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
	var data = {
		id : item.properties.id,
		title : item.properties.title,
		pass : item.properties.pass,
		email : item.properties.email,
		account : item.properties.account,
		pin : item.properties.pin,
		url : item.properties.url,

	};
	Alloy.createController('details', data).getView().open({
		modal : true
	});

});

// method is exposed by widget

// get config view as objects
// var configView = controls.getConfigView();
//
// //add menu view to ConfigView exposed by widget
// configView.menuButton.add(controls.getMenuButtonLeft({
// h : '60',
// w : '60'
// }));
//
// //Minor changes to click event. Update the menuOpen status;
// configView.menuButton.addEventListener('click', function() {
// $.drawermenu.showhidemenu();
// $.drawermenu.menuOpen = !$.drawermenu.menuOpen;
// });
// // method is exposed by widget
//
// $.drawermenu.init({
// menuview : menuView.getView(),
// mainview : mainView.getView(),
// duration : 200,
// parent : $.win
// });
//
// //variable to controler de open/close slide
// var activeView = 1;

//id="menuTable"

var menuView = Alloy.createController('menuview');

// add event listener in this context
$.sideMenu.menuTable.addEventListener('click', function(e) {
	//alert("tableData");

	switch(e.rowData.id) {
	case "about":
		Alloy.createController('about/about').getView().open({
			modal : true
		});

		animationView.animat(self, value, function(e) {
			value = e;

		});

		break;
	case "settings":
		Alloy.createController('setting/setting').getView().open({
			modal : true
		});

		animationView.animat(self, value, function(e) {
			value = e;

		});

		break;
	case "fb":
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
			var facebookDialog = require('socialShare');
			facebookDialog.facebookShare();
		}

		animationView.animat(self, value, function(e) {
			value = e;

		});

		break;
	case "twitter":
		Alloy.createController('social/twitter').getView().open({
			modal : true
		});
		animationView.animat(self, value, function(e) {
			value = e;

		});
		break;
	case "linkdin":
		Alloy.createController('social/linkdin').getView().open({
			modal : true
		});
		animationView.animat(self, value, function(e) {
			value = e;

		});
		break;

	case "whatsapp":
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

			var whatsApp = require('socialShare');
			whatsApp.whatsappShare();

		}
		animationView.animat(self, value, function(e) {
			value = e;

		});
		break;
	case "rate":
		if (OS_ANDROID) {
			Ti.Platform.openURL("market://details?id=com.bd.PasswordManager");
		} else {
			Ti.Platform.openURL("https://itunes.apple.com/us/app/password-security-manager/id1070748246?ls=1&mt=8");
		}
		animationView.animat(self, value, function(e) {
			value = e;

		});
		break;
	}

	// on Android the event is received by the label, so watch out!
	Ti.API.info(e.rowData.id);
});

$.win.addEventListener('androidback', function() {
	var dialog = Ti.UI.createAlertDialog({
		buttonNames : ['Confirm', 'Cancel'],
		message : 'Would you like to exit this App',
		title : 'Exit'
	});
	dialog.addEventListener('click', function(e) {
		if (e.index === 0) {
			Alloy.Events.off('updateMainUI');
			$.win.close();

		}

	});
	dialog.show();
});

