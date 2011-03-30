/*
 * Test for ti.urbanAirship module: Demonstrates how to set up your UA airmail
 * mailbox, and how to display the messages from it via the picker interface.
 */

// open a single window
var window = Ti.UI.createWindow({
  backgroundColor:'white'
});
window.open();

// TODO: write your module tests here
Ti.UrbanAirship = require('ti.urbanAirship');
Ti.API.info("module is => "+Ti.UrbanAirship);

Ti.UrbanAirship.appKey = '<<<YOUR APP KEY HERE>>>';
Ti.UrbanAirship.secret = '<<<YOUR APP SECRET HERE>>>';

var b = Ti.UI.createButton({
	title:'Open UA Mailbox',
	width:200,
	height:40,
	enabled:false
});
b.addEventListener('click', function() {
	// Open default mailbox
	Ti.UrbanAirship.displayInbox();
});
window.add(b);

Ti.Network.registerForPushNotifications({
	types:[Ti.Network.NOTIFICATION_TYPE_BADGE],
	success: function(e) {
		var token = e.deviceToken;
		Ti.UrbanAirship.registerDevice({
			token:token,
//			alias:'<<<CHOOSE AN ALIAS HERE (if you want)>>>'
		});
	
		Ti.API.log('Registered remotely!');
		b.enabled = true;
	}
});