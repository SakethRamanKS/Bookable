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

	// $("#travRadio").click(function()
	// {
	// 	console.log("Trav Click");
	// 	$("#manStuff").hide();
	// 	$("#travStuff").show();
	// });

	// $("#manRadio").click(function()
	// {
	// 	console.log("Man Click");
	// 	$("#manStuff").show();
	// 	$("#travStuff").hide();
	// });
});

function swap(bool)
{
	if(!bool)
	{
		for(el of document.getElementsByClassName("manStuff"))
			el.style.display = "block";
		for(el of document.getElementsByClassName("custStuff"))
			el.style.display = "none";	
	}
	else
	{
		for(el of document.getElementsByClassName("manStuff"))
			el.style.display = "none";
		for(el of document.getElementsByClassName("custStuff"))
			el.style.display = "block";	
	}
}