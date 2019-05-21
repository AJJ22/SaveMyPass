document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#addNewCredSubmit').addEventListener('click', addCred);
});

var MP;
var MU;

chrome.runtime.sendMessage({
	from: 'addNewCreds'
});

chrome.runtime.onMessage.addListener(function(msg, sender) {
	if (msg.from === "background") {
		MU = msg.user
		MP = msg.pass
	}
});

function addCred(){
	var masterUser = MU;
	var masterPass = MP;
	
	var login = document.getElementById("loginURL").value;
	var username = document.getElementById("newUser").value;
	var passwordA = document.getElementById("newPass").value;
	
	//encrypt with master password
	var encryptedPass = CryptoJS.AES.encrypt(passwordA, masterPass);
	
	localStorage.setItem(login, [username, encryptedPass, masterUser]);
}