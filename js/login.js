document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#loginSubmit').addEventListener('click', signin);
});

function signin(){
	console.log("clicked login");
	var inputedUsername = document.getElementById("username").value;
	var inputedPassword = document.getElementById("password").value;
	
	var loggedPassword = localStorage.getItem(inputedUsername);
	//TODO: will need to hash inputedPassword here
	//then check against stored hash (loggedPassword)
	

	if(inputedPassword == loggedPassword){
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