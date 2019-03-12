<script language="JavaScript" type="text/javascript" src="/js/jquery-1.2.6.min.js"></script>
<script language="JavaScript" type="text/javascript" src="/js/jquery-ui-personalized-1.5.2.packed.js"></script>
<script language="JavaScript" type="text/javascript" src="/js/sprinkle.js"></script>


/*function signin(){
	alert("clicked login");
	var username = document.getElementById("username");
	var password = document.getElementById("password");
	if(username == "austin" && password == "12345"){
		alert("success!");
		window.location = "home.html";
	}
}
*/

$(document).ready(function(){
	$("#btn-login").click(function(e){
		e.preventDefault();
		alert("click!");
	});
});



//chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  // Use the token.
//});
