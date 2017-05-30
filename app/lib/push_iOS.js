// Require the module
exports.pushSubscribe = function() {

	var Cloud = require("ti.cloud");
	var deviceToken = null;
	if ((Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {

		// Wait for user settings to be registered before registering for push notifications
		Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {

			// Remove event listener once registered for push notifications
			Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);

			Ti.Network.registerForPushNotifications({
				success : deviceTokenSuccess,
				error : deviceTokenError,
				callback : receivePush
			});
		});

		// Register notification types to use
		Ti.App.iOS.registerUserNotificationSettings({
			types : [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE]
		});
	}

	// For iOS 7 and earlier
	else {
		Ti.Network.registerForPushNotifications({
			// Specifies which notifications to receive
			types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
			success : deviceTokenSuccess,
			error : deviceTokenError,
			callback : receivePush
		});
	}
	// Process incoming push notifications
	function receivePush(e) {
		Ti.API.info('Received push: ' + JSON.stringify(e));
	}

	// Save the device token for subsequent API calls
	function deviceTokenSuccess(e) {
		deviceToken = e.deviceToken;
	}

	function deviceTokenError(e) {
		Ti.API.info('Failed to register for push notifications! ' + e.error);
	}

	function subscribeToChannel() {
		// Subscribes the device to the 'news_alerts' channel
		// Specify the push type as either 'android' for Android or 'ios' for iOS
		Cloud.PushNotifications.subscribeToken({
			device_token : deviceToken,
			channel : 'update_alart',
			type : Ti.Platform.name == 'android' ? 'android' : 'ios'
		}, function(e) {
			if (e.success) {
				Ti.API.info('Subscribed');
			} else {
				Ti.API.info('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}


	Cloud.Users.login({
		login : 'motiur.mbstu@gmail.com',
		password : '1234'
	}, function(e) {
		if (e.success) {
			var user = e.users[0];
			Ti.API.info('Success:\n' + 'id: ' + user.id + '\n' + 'sessionId: ' + Cloud.sessionId + '\n' + 'first name: ' + user.first_name + '\n' + 'last name: ' + user.last_name);
			subscribeToChannel();
		} else {
			Ti.API.info('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

};
