var args = arguments[0] || {};

// Create a Label.
var sending = Ti.UI.createLabel({
    text: 'Mail Sending ........',
    color: 'green',
    font: {
        fontSize: 20
    },
    top: 20,
    left:20,
    height: Ti.UI.SIZE,
    width: Ti.UI.SIZE,

});

var ad = require('admob');

var addview;
if (OS_ANDROID) {
    addview = ad.addMob_android();
} else {
    addview = ad.addMob_iOS();
}

$.adView.add(addview);

function emailSend(email, pass) {
    var Cloud = require('ti.cloud');
    Cloud.Emails.send({
        template: 'Welcome',
        recipients: email,
        password: pass
    }, function(e) {
        if (e.success) {

            if (OS_ANDROID) {
                $.txt_email.setValue("");
                $.txt_email.blur();
                sending.text = "Please check your mail for password";
            } else {
                $.txt_email.setValue("");
                $.txt_email.blur();
                sending.text = "Please check your mail for password";
                //alert('Please check your mail for password');
            }
        } else {
            $.txt_email.setValue("");
            $.txt_email.blur();
            sending.text = 'Your forgot password:' + pass;
            //alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
            //alert('Your forgot password:' + pass);
        }
    });
}

function send() {
    var db = require('loginDB');
    var pass = db.getinfo();

    //alert(pass[0].email + '\n' + pass[1].pass);

    if (pass.length == 0) {

        if (OS_ANDROID) {
            alert("You have no Account!");
        } else {
            alert("You have no Account!");
        }
    } else {
        if ($.txt_email.getValue() == "") {
            if (OS_ANDROID) {
                $.txt_email.blur();
                alert("Please write your mail!");
            } else {
                alert("Please write your mail!");
            }
        } else {

            switch ($.txt_email.getValue()) {
                case pass[0].email:
                    if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {

                        if (OS_ANDROID) {
                            $.txt_email.blur();
                            alert("Please connect to the internet!");
                        } else {
                            alert("Please connect to the internet!");
                        }

                    } else {

                        // Add to the parent view.
                        
                         $.txt_email.blur();
                         $.mainView.add(sending);
                        emailSend(pass[0].email, pass[0].pass);

                    }
                    break;

                default:
                    if (OS_ANDROID) {
                        $.txt_email.blur();
                        alert("Email Does not Match!");
                    } else {
                        alert("Email Does not Match!");
                    }

            }
        }
    }

}

function back() {
    $.settingWin.close();
}
