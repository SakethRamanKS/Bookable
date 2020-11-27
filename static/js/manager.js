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

	$("#profileButton").click(function()
	{
		swal('Loading', 'Your profile is loading', 'info', {buttons: false});
		$.get('/user', function(data)
		{
			swal.close();
			let createDate = new Date(data.createdAt);
			swal({
				title: "Manager Profile",
				text: `Username: ${data.Username}\nEmail: ${data.Email}\nOrganisation: ${data.Manager.TravelName}\nNumber of Bookables: ${data.Manager.BookableCount}\n\nThis Account was created on ${formatDate(data.createdAt)} at ${createDate.getHours()}:${createDate.getMinutes()}`,
				buttons:{
					ok: "Ok",
					logout: {
						text: "Logout",
						value: "logout"
					},
				}

			}).then ((value) =>
			{
				if(value == "logout")
					window.location.replace('./');
			});
		});
	});
});

function formatDate(input)
{
	let date = new Date(input);
	let result = "";
	result += date.getDate()+"/";
	result += (date.getMonth()+1)+"/";
	result += date.getFullYear();
	return result;s
}