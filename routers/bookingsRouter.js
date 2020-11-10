const express = require('express');
const bodyParser = require('body-parser');
const Bookings = require('../models/bookingsModel');
const BookedSeat = require('../models/bookedSeats');

let bookingsRouter = express.Router();
bookingsRouter.use(bodyParser.json())

bookingsRouter.route("/")

.post(async (req, res) => {
    let newBooking = await Bookings.create(req.body);
    for(seat of req.body.Seats)
    {
        console.log(seat);
        await newBooking.createBookedSeat({SeatNum: seat});
    }
    res.status(200).send("Seats booked").end();
});

module.exports = bookingsRouter;