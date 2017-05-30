//var value = true;
exports.animat = function(self, value, cb) {

	if (value == true) {
		self.animate({
			left : 200,
			right : -200,
			duration : 300,
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
		value = false;

		cb(value);

	} else {
		self.animate({
			left : 0,
			right : 0,
			duration : 200,
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
		value = true;
		cb(value);
	}

};
