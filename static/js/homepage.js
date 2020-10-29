$(document).ready(function()
{
	//When the register button is clicked:
	$("#RegisterButton").click(function()
	{
		$.post("/user", $("#RegisterForm").serialize(), function(data)
		{
			//CHANGE THIS LINE TO DO WHATEVER STUFF AFTER RESPONSE
			//ALSO HANDLE AJAX ERROR SEPARATELY
			console.log("Recieved POST data: " + data);
		});
	});

});