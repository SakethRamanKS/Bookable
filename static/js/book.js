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

	div.append(getDivWrap(bookable.Owner, 2));
	div.append(getDivWrap(bookable.Dep, 2));
	div.append(getDivWrap(bookable.Arr, 2));
	div.append(getDivWrap(bookable.Fare, 2));
	

	if(bookable.Type)
		div.append(getDivWrap(`<button class = 'btn btn-primary bookBtn bookBtnFlight' onclick = 'book(${bookable.id})'>Book</button>`,2));
	else
		div.append(getDivWrap(`<button class = 'btn btn-primary bookBtn bookBtnBus' onclick = 'book(${bookable.id})'>Book</button>`,2));

	$('#outerBox').append(div);
}

function book(bookableId)
{
	alert(`You wanna book bookable ${bookableId}`);
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

		let where = {
		src: $('#src').val(),
		dest: $('#dest').val()
		}
		console.log(where);
		$('#outerBox').append(headerDiv);
		$.get('/bookable', {where: where}, function(result)
		{
			console.log(result);
			for(bookable of result)
				getDOMBox(bookable);
		});
	});
});