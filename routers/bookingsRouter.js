const express = require('express');
const bodyParser = require('body-parser');
const Bookings = require('../models/bookingsModel');
const BookedSeat = require('../models/bookedSeats');

const sequelize = require('../connections/dbConnection');
const {QueryTypes} = require('sequelize');

let bookingsRouter = express.Router();
bookingsRouter.use(bodyParser.json());

bookingsRouter.route("/")

.post(async (req, res) => {
	// Creating a new Booking Transaction - indicates that a traveller wishes to reserve seats on a bus/flight

	if(!req.signedCookies['custId'])
	{
		res.status(403).end();
		return;
	}

	req.body.CustomerId = req.signedCookies['custId'];

	// Checking if the particular customer has already reserved seats on this bookable
	let alreadyBooked = await Bookings.findOne({where: {BookableId: req.body.BookableId, CustomerId: req.body.CustomerId}});

	if(alreadyBooked)
	{
		res.status(403).send("BOOK_ERR_01").end();
		return;
	}

	// Verifying that the requested seats are still available
    let bookedSeats = await sequelize.query(`SELECT DISTINCT SeatNum FROM ((BookedSeats \
    INNER JOIN Bookings \
    ON BookedSeats.BookingTXNId = Bookings.TXNId) \
    INNER JOIN Bookables \
    ON Bookings.BookableId = Bookables.id) \
    WHERE Bookables.id = ${req.body.BookableId};`,
    {type: QueryTypes.SELECT});

    // It is possible that the user might have selected a seat that has already been booked
	for(s1 of bookedSeats)
	{
		for(s2 of req.body.Seats)
		{
			let s2Int = parseInt(s2);
			if(s1.SeatNum == s2Int)
			{
				res.status(403).send("BOOK_ERR_02").end();
				return;
			}
		}
	}
   	
	// If the seats are free, they are reserved
    let newBooking = await Bookings.create(req.body);
    for(seat of req.body.Seats)
    {
        console.log(seat);
        await newBooking.createBookedSeat({SeatNum: seat});
    }
    res.status(200).send("Seats booked").end();
});

module.exports = bookingsRouter;