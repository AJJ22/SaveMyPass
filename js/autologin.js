document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#auto-login').addEventListener('click', autoLogin(document.activeElement));
});

function autoLogin(elem) {
	//get current url
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		var url = tabs[0].url;
		//url = window.location.href;
		//console.log(url);
	
		//get values of current URL
		var creds = localStorage.getItem(url);
		console.log(creds);
		newCreds = creds.split(",");
		var username = newCreds[1];
		var password1 = newCreds[2];
		console.log(username);
		console.log(password1);
		//console.log(creds);
		
		//find username field
		//document.getElementById("#email");
		document.getElementById('auto-login').value;

		//input username
		
		//find password input box
		document.getElementById("#pass");
		//input password
		
		//find submit button
		//click submit
	});
}