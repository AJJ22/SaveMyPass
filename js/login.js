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
		
		console.log(data);
		data.masterPassword = inputedPassword;
		console.log(data.masterPassword);
		
		fs = require('fs');
		fh = fopen("variables.json", 0); // Open the file for reading
		if(fh != -1){
			length = flength(fh);        // Get the length of the file
			str = fread(fh, length);     // Read in the entire file
			fclose(fh);                  // Close the file
			 
			// Display the contents of the file
			write(str);
		}
		
		window.location = "home.html";
	}
	else{
		console.log("login failed");
	}
}