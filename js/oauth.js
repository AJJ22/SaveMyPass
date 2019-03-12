/* window.onload=function() {
    document.querySelector('#btn-login').addEventListener('click', function() {
		console.log("click login")
		chrome.identity.getAuthToken({interactive: true}, function(token) {
			let init = {
			method: 'GET',
			async: true,
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json'
			},
			'contentType': 'json'
        };
      });
    });
  };
  */