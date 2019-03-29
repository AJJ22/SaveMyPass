document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#submit').addEventListener('click', signin);
});

function signin(){
	console.log("clicked login");
	var inputedUsername = document.getElementById("username").value;
	var inputedPassword = document.getElementById("password").value;
	//onsole.log(username);
	//console.log(password);
	
	var loggedPassword = localStorage.getItem(inputedUsername);
	
	if(inputedPassword == loggedPassword){
		console.log("success!");
		window.location = "home.html";
	}
	else{
		console.log("login failed");
	}
}