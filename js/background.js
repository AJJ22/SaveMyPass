var masterPass;
var masterUser;

chrome.runtime.onMessage.addListener(function(msg, sender) {
	if (msg.from === "login") {
        masterUser = msg.user
		masterPass = msg.pass
    }
	
	if (msg.from === 'autologin') {
		chrome.runtime.sendMessage({
			from: "background",
			user: masterUser,
			pass: masterPass
		});
	}
	
	if (msg.from === 'addNewCreds') {
		chrome.runtime.sendMessage({
			from: "background",
			user: masterUser,
			pass: masterPass
		});
	}
});