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
				// backgroundGradient : {
				// type : 'linear',
				// startPoint : {
				// x : '0%',
				// y : '0%'
				// },
				// endPoint : {
				// x : '0%',
				// y : '100%'
				// },
				// colors : [{
				// color : '#0091EA',
				// offset : 0.0
				// }, {
				// color : '#0277BD',
				// offset : 0.5
				// }]
				// },
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

