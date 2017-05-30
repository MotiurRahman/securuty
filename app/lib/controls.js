var Alloy = require('alloy');

exports.getMainView = function() {
	return Alloy.createController('mainview');
	
};

exports.getMenuView = function() {
	return Alloy.createController('menuview');
};

exports.getMenuButtonLeft = function(args) {
	var v = Ti.UI.createView({
		height : args.h,
		width : args.w,
		backgroundColor : '#A1D0E0'
	});

	var b = Ti.UI.createView({
		height : "40dp",
		width : "40dp",
		backgroundImage : '/images/menu.png'
	});

	v.add(b);

	return v;
};

exports.getMenuButtonRight = function(args) {
	var v = Ti.UI.createView({
		height : args.h,
		width : args.w,
		backgroundColor : '#A1D0E0',
		left:Ti.Platform.osname
	});

	var b = Ti.UI.createView({
		height : "40dp",
		width : "40dp",
		backgroundImage : '/images/add2.png'
	});

	v.add(b);

	return v;
};

//Get the Configuration Controller
exports.getConfigView = function() {
	return Alloy.createController('config');
};

//Get the Configuration Controller
exports.getOption = function() {
	return Alloy.createController('option');
};
