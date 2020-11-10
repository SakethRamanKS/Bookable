const express = require('express');
const bodyParser = require('body-parser');

const {QueryTypes} = require('sequelize');
const sequelize = require('../connections/dbConnection');

let bookedseatRouter = express.Router();

bookedseatRouter.use(bodyParser.json());

bookedseatRouter.route("/")
.get(async (req, res) => 
{
    let seats = await sequelize.query(`SELECT DISTINCT SeatNum FROM ((BookedSeats \
        INNER JOIN Bookings \
        ON BookedSeats.BookingTXNId = Bookings.TXNId) \
        INNER JOIN Bookables \
        ON Bookings.BookableId = Bookables.id) \
        WHERE Bookables.id = ${req.body.BookableId};`,
        {type: QueryTypes.SELECT});
    
    res.json(seats);
});


module.exports = bookedseatRouter;

