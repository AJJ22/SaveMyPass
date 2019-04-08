document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#loginSubmit').addEventListener('click', signin);
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

function signin(){
	var inputedUsername = document.getElementById("username").value;
	var inputedPassword = document.getElementById("password").value;
	
	hashedPasswordFromInput = inputedPassword.hashCode();
	var loggedPassword = localStorage.getItem(inputedUsername);	
	
	if(hashedPasswordFromInput == loggedPassword){
		console.log("login success!");
		
		chrome.runtime.sendMessage({
			from: "login",
			user: inputedUsername,
			pass: inputedPassword
		});
		
		window.location = "home.html";
	}
	else{
		console.log("login failed ):");
	}
}