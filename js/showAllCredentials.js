document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#showCredentials').addEventListener('click', showCredentials);
});

var masterUser;
var masterPass;

chrome.runtime.sendMessage({
	from: 'showCreds'
});

chrome.runtime.onMessage.addListener(function(msg, sender) {
	if (msg.from === "background") {
		masterUser = msg.user
		masterPass = msg.pass
	}
});


function addRow(url, username, decryptedPass){
	tabBody = document.getElementsByTagName("tbody").item(0);
	
	row = document.createElement("tr");
	cell1 = document.createElement("td");
	cell2 = document.createElement("td");
	cell3 = document.createElement("td");
	
	textnode1 = document.createTextNode(username);
	textnode2 = document.createTextNode(decryptedPass);
	textnode3 = document.createTextNode(url);
	
	cell3.appendChild(textnode3);
	cell1.appendChild(textnode1);
	cell2.appendChild(textnode2);
	
	row.appendChild(cell3);
	row.appendChild(cell1);
	row.appendChild(cell2);
	
	tabBody.appendChild(row);
}

function showCredentials(){
	var passwor = document.getElementById("password").value;

	if(passwor == masterPass){
		//loop through all things stored in localStorage
		for(var i=0; i<localStorage.length; i++){
			//get array from storage
			var key = localStorage.key(i);
			var creds = localStorage.getItem(key);
			newCreds = creds.split(",");
			
			if(newCreds.length > 2){
				//get credentials out of array
				var url = newCreds[0];
				var username = newCreds[1];
				var encryptedPass = newCreds[2];
				var masterUsername = newCreds[3];
				
				if(masterUser == masterUsername){
					//decrypt password and create new row for creds
					var decryptedPass = CryptoJS.AES.decrypt(encryptedPass, masterPass);
					decryptedPass = decryptedPass.toString(CryptoJS.enc.Utf8);
					
					addRow(url, username, decryptedPass);
				}
			}
		}
	}
	else{
		console.log("incorrect password, foo");
	}
}