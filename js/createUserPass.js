document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#submit').addEventListener('click', createUserPass);
});

String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function createUserPass() {
	var username = document.getElementById("username").value;
	var pass = document.getElementById("pass1").value;
	var confirmPass = document.getElementById("pass2").value;
	
	if(pass == confirmPass){
		//i can hash this instead of encrypting it
		//var encryptedPass = CryptoJS.AES.encrypt(pass, "12345");
		hashedPass = pass.hashCode();
		localStorage.setItem(username, [hashedPass]);
	}
	else{
		console.log("passwords do not match, please try again (^:");
	}
}