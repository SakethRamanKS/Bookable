$(document).ready(function()
{
	$(document).ajaxError(function(event, jqXHR, settings, thrownError)
	{
		//invalid username
		if(jqXHR.status === 404)
			swal("Invalid username", "The email you have entered is invalid.\nPlease create a new account or enter a valid username.", "error");
		if(jqXHR.status == 403)
			swal("Incorrect password", "The password you have entered is incorrect", "error");
	});
	//When the register button is clicked:
	$("#RegisterButton").click(function()
	{
		console.log('REGISTER');
		swal({title: "Processing",text: "Please wait, your account is being created", icon: "info", button: null})

		let unfilled = false;

		let trav = document.getElementById("travRadio").checked;
		$("#RegisterForm :input").map(function ()
		{
			// console.log($(this).prop('id'));
			if(trav && $(this).prop('id').startsWith('man'))
				;
			else if(!trav && $(this).prop('id').startsWith('cust'))
				;
			else 
			{
				if(!$(this).val())
					unfilled = true;
			}
		});

		if(unfilled)
		{
			swal("Missing data", "All input fields are mandatory", "warning");
			return;
		}

		// $.post("/user", $("#RegisterForm").serialize(), function(data)
		// {
		// 	console.log("Recieved POST data: " + data);
		// 	swal("Success", "You have successfully created a Bookable account!\nPlease login to continue.", "success");
		// });
	});

	$("#LoginButton").click(function()
	{
		swal({title: "Logging you in",text: "Please wait, as we log you in", icon: "info", button: null});

		let unfilled = false;
		$("#LoginForm :input").map(function ()
		{
			if(!$(this).val())
				unfilled = true;
		});

		if(unfilled)
		{
			swal("Missing data", "All input fields are mandatory", "warning");
			return;
		}

		console.log("LOGIN");
		$.post("/user/login", $("#LoginForm").serialize(), function(data)
		{
			console.log("Recieved POST data: " + data);
			swal("Success", "Login successful", "success");
		});
	});

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