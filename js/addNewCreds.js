document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#addNewCredSubmit').addEventListener('click', addCred);
});

function addCred() {
	var login = document.getElementById("loginURL").value;
	var username = document.getElementById("newUser").value;
	var passwordA = document.getElementById("newPass").value;
	
	console.log(masterPassword);
	
	//encrypt password maybe username?
	var encryptedPass = CryptoJS.AES.encrypt(passwordA, masterPassword);
	//TODO: this might fail because im getting the key, not the value
	//I need the value!
	localStorage.setItem(login, [login, username, encryptedPass, masterUsername]);
}