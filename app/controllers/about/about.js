var args = arguments[0] || {};


var ad = require('admob');

var addview;
if (OS_ANDROID) {
	addview = ad.addMob_android();
} else {
	addview = ad.addMob_iOS();
}

$.adView.add(addview); 


function close() {
	$.aboutWin.close();
	$.aboutWin = null;

}
