$(document).ready(function()
{
	$(document).ajaxError(function(event, jqXHR, settings, thrownError)
	{
		alert("Error: " + thrownError);
	});


	$("#BusSubmit").click(function()
	{
		// Perform input validation here

		swal({title: "Creating your bus",text: "Please wait, your bus is being created.", icon: "info", button: null});

		$.post('/bookable', $("#BusForm").serialize() + "&Type=0", function(result)
		{
			swal("Success", "Your bus has been created successully", "success");
		});
	});

	$("#FlightSubmit").click(function()
	{
		// Perform input validation here

		swal({title: "Creating your flight",text: "Please wait, your flight is being created.", icon: "info", button: null});

		$.post('/bookable', $("#FlightForm").serialize() + "&Type=1", function(result)
		{
			swal("Success", "Your flight has been created successully", "success");
		});
	});
});