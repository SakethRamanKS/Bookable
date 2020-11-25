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
		div.append(getDivWrap(`<button class = 'btn btn-primary bookBtn bookBtnFlight' onclick = 'flightBook(${bookable.id}, ${bookable.TotSeat}, "${bookable.Flight.SrcAirport}", "${bookable.Flight.DestAirport}", "${bookable.Flight.FlightNumber}")'>Book</button>`,2));
	else
		div.append(getDivWrap(`<button class = 'btn btn-primary bookBtn bookBtnBus' onclick = 'busBook(${bookable.id}, ${bookable.TotSeat}, ${bookable.Bus.SeatType}, ${bookable.Bus.AcType}, "${bookable.Bus.BusNumber}")'>Book</button>`,2));

	$('#outerBox').append(div);
}


function getSeatTable(TotSeat, seatPerRow, bookedSeats)
{
	let presentSeatNum = 1;
	let table = $("<table class = 'centered'></table>");

	let booked;

	for (var j = 0; j < parseInt(TotSeat / seatPerRow) ; j++)
    {
        var tr = $("<tr></tr>");
        for (var k = 0; k < parseInt(seatPerRow/2); k++)
        {
            var td = $("<td></td>");
            td.attr("title", "Seat Number: " + presentSeatNum);
            td.attr("id", presentSeatNum);

            var img = $("<img>");

            booked = false;

            for(obj of bookedSeats)
            {
            	if(obj.SeatNum == presentSeatNum)
            	{
            		booked = true;
            		break;
            	}
            }
            if(!booked)
            {
                img.attr("src", "seat.png");
                td.attr("onclick",`bookSeat(this)`);
            }
            else {
                img.attr("src", "seat_booked.png");
            }
            img.attr("width", "135%");
            img.attr("class", presentSeatNum);
            td.append(img);
            tr.append(td);
            presentSeatNum++;
        }

        var td = $("<td></td>").text("  ");
        td.addClass("big");
        tr.append(td);

        for (var k = 0; k < parseInt(seatPerRow/2); k++)
        {
            var td = $("<td></td>");
            td.attr("title", "Seat Number: " + presentSeatNum);
            td.attr("id", presentSeatNum);

            var img = $("<img>");

            booked = false;

            for(obj of bookedSeats)
            {
            	if(obj.SeatNum == presentSeatNum)
            	{
            		booked = true;
            		break;
            	}
            }

            if(!booked)
            {
                img.attr("src", "seat.png");
                td.attr("onclick",`bookSeat(this)`);
            }
            else {
                img.attr("src", "seat_booked.png");
            }
            img.attr("width", "135%");
            img.attr("class", presentSeatNum);
            td.append(img);
            tr.append(td);
            presentSeatNum++;
        }

        table.append(tr);
    }
    return table;
}

let selected = [];

function bookSeat(seat)
{
	//convert to JQuery
	seat = $(seat);
	// console.log("SEAT ID: " + seat.attr('id'));
	let img = seat.children()[0];
	img = $(img);
	// The particular seat has already been selected
	if(selected.includes(seat.attr('id')))
	{
		img.attr('src', 'seat.png');
		selected.splice(selected.indexOf(seat.attr('id')), 1);
	}
	else
	{
		img.attr('src', 'seat_selected.png');
		selected.push(seat.attr('id'));
	}
	updateSelDiv();
}

function updateSelDiv()
{
	$("#selDiv").empty();
	if(selected.length == 0)
	{
		$("#selDiv").append("No Seats Selected");
		return;
	}
	$("#selDiv").append("Seats Selected: ");
	let str = "";
	for(seatNum of selected)
	{
		str += seatNum + " ";
	}
	$('#selDiv').append(str);
}

function bookSubmit(bookableId)
{
	swal({title: "Processing",text: "Your seats are being reserved.\nThis might take a while.", icon: "info", button: null});
	$.post('/bookings', {BookableId: bookableId, Seats: selected}, function(data)
	{
		swal.close();
		swal("Success!", "You have successfully booked a ticket on Bookable!", "success", {buttons: "Logout"})
		.then((value) => {
			window.location.replace('./');
		});
	});
}

function busBook(id, totseat, sleepertype, actype, busNum)
{
	selected = [];
	$.get( "/bookedseats", {BookableId: id}, function(data)
    {
    	$('#displayBox').empty();
		$('#displayBox').css('border-style', 'solid none solid none');
		$("#displayBox").css('border-color', '#64dd17');
		$('#displayBox').css('border-width', '10px');
		$('#displayBox').css('background-color', '#1faa00');

		let headingDiv = $("<div class = 'busBookingHeading row'></div>");

        $('#displayBox').append("<br>");
        headingDiv.append('Select your Seats');
        $('#displayBox').append(headingDiv);
        $('#displayBox').append("<br><br>");

        actype = actype? "AC" : "Non - AC";
        sleepertype = sleepertype? "Sleeper" : "Semi - Sleeper";

		let detailRow = $(`<div class = 'row' id = 'detailRow'> Bus Number: ${busNum} <br><br> Bus Type: ${actype + " " + sleepertype} </div>`);
		

		detailRow.append("<br><br><br>");

		var head_1 = $("<p></p>");
		var img_1 = $("<img>");
		img_1.attr("src", "seat.png");
		head_1.append(img_1);
		var p_1 = $("<p></p>").text("Available Seats");
		head_1.append(p_1);
		detailRow.append(head_1);

		var head_2 = $("<p></p>");
		var img_2 = $("<img>");
		img_2.attr("src", "seat_booked.png");
		head_2.append(img_2);
		var p_2 = $("<p></p>").text("Booked Seats");
		head_2.append(p_2);
		detailRow.append(head_2);

		var head_3 = $("<p></p>");
		var img_3 = $("<img>");
		img_3.attr("src", "seat_selected.png");
		head_3.append(img_3);
		var p_3 = $("<p></p>").text("Selected Seats");
		head_3.append(p_3);
		detailRow.append(head_3);
		detailRow.append("<hr>");
		detailRow.append("<h3>Driver here</h3>");

        $('#displayBox').append(detailRow);
        $('#displayBox').append("<br><br>");

        $('#displayBox').append(getSeatTable(totseat, 4, data));

        $('#displayBox').append("<br><br>");

        $('#displayBox').append("<div id = 'selDiv'>No Seats Selected</div>");

        $('#displayBox').append("<br><br>");

        $('#displayBox').append($(`<button id = "busSubmitButton" class = "btn" onclick = "bookSubmit(${id})"> Book Seats </button>`));

        $('#displayBox').append("<br><br>");
    });
}

function flightBook(id, totseat, SrcAirport, DestAirport, flightNum)
{
	selected = [];
	$.get( "/bookedseats", {BookableId: id}, function(data)
    {
		$('#displayBox').empty();
		$('#displayBox').css('border-style', 'solid none solid none');
		$("#displayBox").css('border-color', '#ffb300');
		$('#displayBox').css('border-width', '10px');
		$('#displayBox').css('background-color', '#c68400');

        let headingDiv = $("<div class = 'flightBookingHeading row'></div>");

        $('#displayBox').append("<br>");
        headingDiv.append('Select your Seats');
        $('#displayBox').append(headingDiv);
        $('#displayBox').append("<br><br>");

        let detailRow = $(`<div class = 'row' id = 'detailRow'>Flight Number: ${flightNum}<br><br></div>`);
        let srcDiv = $("<div class = 'col-md-3'></div>");
        srcDiv.append("Source Airport: " + SrcAirport);
        let destDiv = $("<div class = 'col-md-3'></div>");
        destDiv.append("Destination Airport: " + DestAirport);


        detailRow.append(getDivWrap("", 3));
        detailRow.append(srcDiv);
       	detailRow.append(destDiv);
        detailRow.append(getDivWrap("", 3));

		detailRow.append("<br><br><br>");

		var head_1 = $("<p></p>");
		var img_1 = $("<img>");
		img_1.attr("src", "seat.png");
		head_1.append(img_1);
		var p_1 = $("<p></p>").text("Available Seats");
		head_1.append(p_1);
		detailRow.append(head_1);

		var head_2 = $("<p></p>");
		var img_2 = $("<img>");
		img_2.attr("src", "seat_booked.png");
		head_2.append(img_2);
		var p_2 = $("<p></p>").text("Booked Seats");
		head_2.append(p_2);
		detailRow.append(head_2);

		var head_3 = $("<p></p>");
		var img_3 = $("<img>");
		img_3.attr("src", "seat_selected.png");
		head_3.append(img_3);
		var p_3 = $("<p></p>").text("Selected Seats");
		head_3.append(p_3);
		detailRow.append(head_3);
		detailRow.append("<hr>");
		detailRow.append("<h3>Pilot here</h3>");

		$('#displayBox').append(detailRow);
        $('#displayBox').append("<br><br>");

        $('#displayBox').append(getSeatTable(totseat, 6, data));

        $('#displayBox').append("<br><br>");

        $('#displayBox').append("<div id = 'selDiv'>No Seats Selected</div>");

        $('#displayBox').append("<br><br>");

        $('#displayBox').append($(`<button id = "flightSubmitButton" class = "btn" onclick = "bookSubmit(${id})"> Book Seats </button>`));

        $('#displayBox').append("<br><br>");
    });
}

$(document).ready(function() {

	$(document).ajaxError(function(event, jqXHR, settings, thrownError)
	{
		if(jqXHR.responseText == "BOOK_ERR_01")
		{
			swal.close();
			swal("Error!", "You have already reserved seats on this bookable.", "error");
		}
		if(jqXHR.responseText == "BOOK_ERR_02")
		{
			swal.close();
			swal("Uh Oh!", "Some of the seats that you have selected have already been reserved.", "info").then((value) =>
			{
				window.location.replace('./book.htm');
			});
		}
	});

	$('#searchBtn').click(function ()
	{
		swal({title: "Searching Bookables",text: "Please wait, your request is being processed.", icon: "info", button: null});
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
				swal.close();
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

	$("#profileButton").click(function()
	{
		swal('Loading', 'Your profile is loading', 'info', {buttons: false});
		$.get('/user', function(data)
		{
			swal.close();
			let createDate = new Date(data.createdAt);
			let gender = data.Customer.Gender? "Female": "Male";
			swal({
				title: "Traveller Profile",
				text: `Username: ${data.Username}\nEmail: ${data.Email}\nDoB: ${formatDate(data.Customer.DoB)}\nGender: ${gender}\n\nThis Account was created on ${formatDate(data.createdAt)} at ${createDate.getHours()}:${createDate.getMinutes()}`,
				buttons:
				{
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
	return result;
}