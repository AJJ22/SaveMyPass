document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#auto-login').addEventListener('click', autoLogin);
});

function autoLogin() {
	chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
		var url = tabs[0].url;
		//url = window.location.href;
		console.log(url);
	
		//get values of current URL
		var creds = localStorage.getItem(url);
		console.log(creds);
		newCreds = creds.split(",");
		var username = newCreds[1];
		var encryptedPass = newCreds[2];
		var url = newCreds[0];
		
		var decryptedPass = CryptoJS.AES.decrypt(encryptedPass, "12345");
		decryptedPass = decryptedPass.toString(CryptoJS.enc.Utf8);

		console.log(username);
		console.log(encryptedPass);
		console.log(decryptedPass);
		
		//console.log(creds);
		
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
	});
}