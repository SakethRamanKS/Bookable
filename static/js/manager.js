$(document).ready(function()
{

	console.log("Something");
	$(document).ajaxError(function(event, jqXHR, settings, thrownError)
	{
		alert("Error: " + thrownError);
	});


	$("#BusSubmit").click(function()
	{
		// Perform input validation here

		swal({title: "Creating your bus",text: "Please wait, your bus is being created", icon: "info", button: null});

		$.post('/bookable', $("#BusForm").serialize() + "&Type=0", function(result)
		{
			swal("Success", "Your bus has been created successully", "success");
		});
	});
});