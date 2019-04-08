document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#deleteSubmit').addEventListener('click', deleteCreds);
});

function deleteCreds(){
	var url = document.getElementById("urlToDelete").value;
	localStorage.removeItem(url);
}