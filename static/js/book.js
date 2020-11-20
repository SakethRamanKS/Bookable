var allBookables;

function getDivWrap(text, col)
{
	return `<div class = 'col-md-${col}'> ${text} </div>`;
}

function getDOMBox(bookable)
{
	let div = $('<div class = "container bkblBox"></div');

	if(bookable.Type)
	{
		div.addClass('bkblBoxFlight');
		div.append(getDivWrap('<span class = "fa fa-plane w3-xlarge"> </span>', 2));
	}
	else
	{
		div.addClass('bkblBoxBus');
		div.append(getDivWrap('<span class = "fa fa-bus w3-xlarge"> </span>', 2));
	}
 
	div.append(getDivWrap(bookable.Manager.TravelName, 2));
	div.append(getDivWrap(bookable.Dep, 2));
	div.append(getDivWrap(bookable.Arr, 2));
	div.append(getDivWrap(bookable.Fare, 2));
	

	if(bookable.Type)
		div.append(getDivWrap(`<button class = 'btn btn-primary bookBtn bookBtnFlight' onclick = 'book(${bookable.id})'>Book</button>`,2));
	else
		div.append(getDivWrap(`<button class = 'btn btn-primary bookBtn bookBtnBus' onclick = 'book(${bookable.id})'>Book</button>`,2));

	$('#outerBox').append(div);
}

function book(num)
{
	console.log(num);
	console.log(allBookables);
	//alert(`You wanna book bookable ${single}`);
	var count;
	for(count = 0; count < allBookables.length; count++)
		if(allBookables[count].id == num)
			break;

	console.log(count);
	$.get( "/bookedSeat",allBookables[count].id, function(data, status)
    {
        console.log(status);
    }
    );
	var bigDiv = $('#displayBox');
	var table = $("<table></table>");

	if(allBookables[count].Type)
	{
		console.log("inside");
		var div = $('<div align = "center"></div>');
		div.attr("id", "bookable_display");
	
		var header = $("<h2></h2>").html("Save your Seats");
		div.append(header);
	
		var head_1 = $("<h2></h2>");
		var img_1 = $("<img>");
		img_1.attr("src", "seat.png");
		head_1.append(img_1);
		var p_1 = $("<p></p>").text("Available Seats");
		head_1.append(p_1);
		div.append(head_1);
	
		var head_2 = $("<h2></h2>");
		var img_2 = $("<img>");
		img_2.attr("src", "seat_booked.png");
		head_2.append(img_2);
		var p_2 = $("<p></p>").text("Booked Seats");
		head_2.append(p_2);
		div.append(head_2);
	
		var head_3 = $("<h2></h2>");
		var img_3 = $("<img>");
		img_3.attr("src", "seat_selected.png");
		head_3.append(img_3);
		var p_3 = $("<p></p>").text("Selected Seats");
		head_3.append(p_3);
		div.append(head_3);
		div.append("<hr>");
		div.append("<h2>Pilot here !!</h2>");
		
		bigDiv.append(div);
	}
	else
	{

	}
}

$(document).ready(function() {

	$('#searchBtn').click(function ()
	{
		$('#outerBox').empty();

		let headerDiv = $('<div class = "container header"> </div>');
		headerDiv.append("<div class = 'col-md-2'> </div>");
		headerDiv.append("<div class = 'col-md-2'> Travels</div>");
		headerDiv.append("<div class = 'col-md-2'> Departure </div>");
		headerDiv.append("<div class = 'col-md-2'> Arrival</div>");
		headerDiv.append("<div class = 'col-md-2'> Fare</div>");

		let where = 
		{
			src: $('#src').val(),
			dest: $('#dest').val()
		}
		

		$.get('/bookable', {where: where}, function(result)	
		{
			if(result.length!=0)
			{
				console.log(result);
				allBookables = result;
				$('#outerBox').append(headerDiv);

				for(bookable of result)
				getDOMBox(bookable);
			}
			else
			{
				swal('No Results Found', 'We could not find any results for the given source and destination', 'warning');
			}
		});
	});
});