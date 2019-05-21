document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#auto-login').addEventListener('click', autoLogin);
});

var U;
var P;

chrome.runtime.sendMessage({
	from: 'autologin'
});

chrome.runtime.onMessage.addListener(function(msg, sender) {
	if (msg.from === "background") {
		U = msg.user
		P = msg.pass
		document.getElementById("name").innerHTML = U;
	}
});


function autoLogin() {
	var loggedInUser = U;
	var loggedInPass = P;
	
	chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
		var url = tabs[0].url;
	
		//get values of current URL
		var creds = localStorage.getItem(url);
		
		if(creds != null){
			//put the username, password, and masterUser into variables from the array0
			newCreds = creds.split(",");
			var username = newCreds[0];
			var encryptedPass = newCreds[1];
			var masterUser = newCreds[2];
			
			
			if(masterUser === loggedInUser){
				var decryptedPass = CryptoJS.AES.decrypt(encryptedPass, loggedInPass);
				decryptedPass = decryptedPass.toString(CryptoJS.enc.Utf8);
				
				
				//facebook: W
				//battle.net: W
				//ebay: W
				//amazon: F (hidden input between)
				//efollett: F (hidden input between)
				//adobe: ?
				
				////////////////THIRD VERSION//////////////////
				//FIND PASSWORD FIELD
				
				chrome.tabs.executeScript(null,{
					code: 'Array.from(document.getElementsByTagName("input")).map(h => [h.id, h.type])'
				},
				function (results){
					//go through all ID's of input tags
					console.log(results[0]);
					for(var i=0; i<results[0].length; i++){
						//1st dimension: ignore getting the array, always 0
						//2nd deminsion: pair of (ID, type), should be i
						//3rd dimension: (0: ID, 1: type)
						
						if(results[0][i][1] == "password"){
							//console.log(results[0][i]);
							chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("' + results[0][i-1][0] + '").value = "' + username      + '";'});
							chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("' + results[0][i  ][0] + '").value = "' + decryptedPass + '";'});
						}
						
						if(results[0][i][1] == "submit"){
							//console.log(results[0][i]);
							chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("' + results[0][i][0] + '").click();'});
						}
					}
				});
				//find button tags if login was not an input tag
				chrome.tabs.executeScript(null,{
					code: 'Array.from(document.getElementsByTagName("button")).map(h => [h.id, h.type])'
				},
				function (results){
					//console.log(results[0]);
					for(var i=0; i<results[0].length; i++){
						if(results[0][i][1] == "submit"){
							//console.log(results[0][i]);
							chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("' + results[0][i][0] + '").click();'});
						}
					}
				});
				
				
				
				
				////////////////SECOND VERSION//////////////////
				/*
				//USERNAME FIELD
				chrome.tabs.executeScript(null,{
					code: 'Array.from(document.getElementsByTagName("input")).map(h => h.id)'
				},
				function (results){
					//go through all ID's of input tags
					for(var i=0; i<results[0].length; i++){
						//if any look like email/username field then input username
						if(results[0][i] == "email" || results[0][i] == "ap_email"){
							chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("' + results[0][i] + '").value = "' + username + '";'});
						}
					}
				});

				//PASSWORD FIELD
				chrome.tabs.executeScript(null,{
					code: 'Array.from(document.getElementsByTagName("input")).map(h => h.id)'
				},
				function (results){
					for(var i=0; i<results[0].length; i++){
						if(results[0][i] == "pass" || results[0][i] == "ap_password"){
							chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("' + results[0][i] + '").value = "' + decryptedPass + '";'});
						}
					}
				});
				
				//TODO: fix this!!
				//SUBMIT BUTTON
				chrome.tabs.executeScript(null,{
					code: 'Array.from(document.getElementsByTagName("input")).map(h => h.id)'
				},
				function (results){
					console.log(results);
					for(var i=0; i<results[0].length; i++){
						console.log(results[0][i]);
						//i guess i need both of these "u_0_2" & "submit"? why, i dont know
						if(results[0][i] == "u_0_3" || results[0][i] == "signInSubmit" || results[0][i] == "u_0_8"){
							chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("' + results[0][i] + '").click();'});
						}
					}
				});
				*/
				
				
				
				
				////////////////FIRST VERSION//////////////////
				/*
				//FACEBOOK
				if(url == "https://www.facebook.com/"){
					//find username field and input username
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("email").value = "' + username + '";'});
					//find password input and put pass
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("pass").value = "' + decryptedPass + '";'});
					//find and click submit button
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("loginbutton").click();'});
				}
				//AMAZON
				else if(url == "https://www.amazon.com/ap/signin?_encoding=UTF8&ignoreAuthState=1&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2F%3Fref_%3Dnav_signin&switch_account="){
					console.log(url);
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("ap_email").value = "' + username + '";'});
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("ap_password").value = "' + decryptedPass + '";'});
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("signInSubmit").click();'});
				}
				//BATTLE.NET
				else if(url == "https://us.battle.net/login/en/?ref=https://us.battle.net/oauth/authorize?response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fwww.blizzard.com%252Fauth%252Fbnet%252Fcallback%26scope%3Dlogout%2520account.licenses%2520email%2520name%2520private_flags%2520primary-address%2520account.full%26client_id%3D3d87a4f120754e15840548b68d9ea4db&app=oauth"){
					console.log(url);
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("accountName").value = "' + username + '";'});
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("password").value = "' + decryptedPass + '";'});
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("submit").click();'});
				}
				//ADOBE
				else if(url == "https://adobeid-na1.services.adobe.com/renga-idprovider/pages/login?callback=https%3A%2F%2Fims-na1.adobelogin.com%2Fims%2Fadobeid%2Fadobedotcom2%2FAdobeID%2Ftoken%3Fredirect_uri%3Dhttps%253A%252F%252Fwww.adobe.com%252Findex2.html%2523from_ims%253Dtrue%2526old_hash%253D%2526api%253Dauthorize&client_id=adobedotcom2&scope=creative_cloud%2CAdobeID%2Copenid%2Cgnav%2Cread_organizations%2Cadditional_info.projectedProductContext%2Csao.ACOM_CLOUD_STORAGE%2Csao.stock%2Csao.cce_private%2Cadditional_info.roles&denied_callback=https%3A%2F%2Fims-na1.adobelogin.com%2Fims%2Fdenied%2Fadobedotcom2%3Fredirect_uri%3Dhttps%253A%252F%252Fwww.adobe.com%252Findex2.html%2523from_ims%253Dtrue%2526old_hash%253D%2526api%253Dauthorize%26response_type%3Dtoken&display=web_v2&relay=e9b7c293-75f5-4f44-83e5-84780d7f0d4a&locale=en_US&flow_type=token&idp_flow_type=login"){
					console.log(url);
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("adobeid_username").value = "' + username + '";'});
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("adobeid_password").value = "' + decryptedPass + '";'});
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("sign_in").click();'});
				}
				//EBAY
				else if(url == "https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&ru=https%3A%2F%2Fwww.ebay.com%2F" || url == "https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&ru="){
					console.log(url);
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("userid").value = "' + username + '";'});
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("pass").value = "' + decryptedPass + '";'});
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("sgnBt").click();'});
				}
				//eFollett
				else if(url == "https://www.bkstr.com/webapp/wcs/stores/servlet/LogonForm?langId=-1&catalogId=10001&categoryId=0&storeId=10051&krypto=BkxEkfE0%2FeGFWN5Iag1Ss8%2BXmE10%2BH72dYYDXT6s0tg%2Bwa8b4%2FxrgViutZbrbkGaCALHPyjyfqik%0ADax5s%2B2ge6Rw2WkUavVFm%2Bf8JFwfU5JIHSCAZrGh65e9da29RIbJ6ePj6p9IrXX9QDwxKEw9uxKI%0AWXuwSFStBwo2GNucqwjj9v7yPXTQxQfeTuccQE%2FZ&ddkey=https%3AFLLogon"){
					console.log(url);
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("logonId").value = "' + username + '";'});
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("logonPassword").value = "' + decryptedPass + '";'});
					chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("login").click();'});
				}
				else{
					console.log("ERROR: site credential locations not recorded. please ask austin about it. (^:");
				}
				*/
			}
			else{
				console.log("could not find any credentials under your usernames");
			}
		}
		else{
			console.log("There are no matching URLs for your current page. Please add it to your credential list by visiting: credentials -> add");
		}
	});
}