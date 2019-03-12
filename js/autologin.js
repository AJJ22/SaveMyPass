document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#auto-login').addEventListener('click', autoLogin);
});

function autoLogin() {
	chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
		var url = tabs[0].url;
		//url = window.location.href;
		console.log(url);
	
		//get values of current URL
		var creds = localStorage.getItem(url);
		console.log(creds);
		newCreds = creds.split(",");
		var username = newCreds[1];
		var password1 = newCreds[2];
		console.log(username);
		console.log(password1);
		//console.log(creds);
		
		//find username field and input username
		chrome.tabs.executeScript(
			tabs[0].id,
			//{code: 'document.body.style.backgroundColor = "' + color + '";'});
			{code: 'document.getElementById("email").value = "' + username + '";'}
		);
		
		//find password input and put pass
		chrome.tabs.executeScript(
			tabs[0].id,
			//{code: 'document.body.style.backgroundColor = "' + color + '";'});
			{code: 'document.getElementById("pass").value = "' + password1 + '";'}
		);
		
		//find and click submit button
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'document.getElementById("loginbutton").click();'}
		);
	});
}