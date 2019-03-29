document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#submit').addEventListener('click', createUserPass);
});

function createUserPass() {
	var username = document.getElementById("username").value;
	var pass = document.getElementById("pass1").value;
	var confirmPass = document.getElementById("pass2").value;
	
	if(pass == confirmPass){
		//i can hash this instead of encrypting it
		//var encryptedPass = CryptoJS.AES.encrypt(pass, "12345");
		localStorage.setItem(username, [pass]);
	}
	else{
		console.log("passwords do not match, please try again (^:");
	}
}