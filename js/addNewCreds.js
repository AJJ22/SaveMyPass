document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#submit').addEventListener('click', addCred);
});

function addCred() {
	var login = document.getElementById("loginURL").value;
	var username = document.getElementById("newUser").value;
	var passwordA = document.getElementById("newPass").value;
		
	//encrypt password maybe username?
	var encryptedPass = CryptoJS.AES.encrypt(passwordA, "12345");
	//TODO: this might fail because im getting the key, not the value
	//I need the value!
	localStorage.setItem(login, [login, username, encryptedPass]);
}