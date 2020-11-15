function getDivWrap(text, col)
{
	return `<div class = 'col-md-${col}'> ${text} </div>`;
}

function getDOMBox(bookable)
{
	let div = $('<div class = "container"></div');
	div.addClass('bookableDisp');

	if(bookable.Type)
		div.append(getDivWrap('Flight', 3));
	else
		div.append(getDivWrap('Bus', 3));

	div.append(getDivWrap(bookable.Owner, 3));
	div.append(getDivWrap(bookable.Dep, 3));
	div.append(getDivWrap(bookable.Arr, 3));

	$('#outerBox').append(div);
}


$(document).ready(function() {

	$('#searchBtn').click(function ()
	{
		let where = {
			src: $('#src').val(),
			dest: $('#dest').val()
		}
		console.log(where);
		$.get('/bookable', {where: where}, function(result)
		{
			console.log(result);
			for(bookable of result)
				getDOMBox(bookable);
		});
	});
});