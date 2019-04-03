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
	console.log("clicked login");
	var inputedUsername = document.getElementById("username").value;
	var inputedPassword = document.getElementById("password").value;
	
	hashedPasswordFromInput = inputedPassword.hashCode();
	
	var loggedPassword = localStorage.getItem(inputedUsername);
	//TODO: will need to hash inputedPassword here
	//then check against stored hash (loggedPassword)
	

	if(hashedPasswordFromInput == loggedPassword){
		console.log("success!");
		
		chrome.runtime.sendMessage({
			from: "login",
			user: inputedUsername,
			pass: inputedPassword
		});
		
		window.location = "home.html";
	}
	else{
		console.log("login failed");
	}
}