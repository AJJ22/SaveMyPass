chrome.runtime.onMessage.addListener(function(msg, sender) {
	if (msg.from === 'login') {
		console.log("got msg from login.js!");
	}
});