document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#loginSubmit').addEventListener('click', signin);
});

function signin(){
	console.log("clicked login");
	var inputedUsername = document.getElementById("username").value;
	var inputedPassword = document.getElementById("password").value;
	//onsole.log(username);
	//console.log(password);
	
	var loggedPassword = localStorage.getItem(inputedUsername);
	//TODO: will need to decrypt password here
	//console.log(masterPassword);

	if(inputedPassword == loggedPassword){
		console.log("success!");
		
		//console.log(data);
		//masterPassword = inputedPassword;
		//console.log(masterPassword);
		
		chrome.runtime.sendMessage({
			from: 'login',
			subject: "sendVar"
		});
		
		window.location = "home.html";
	}
	else{
		console.log("login failed");
	}
}