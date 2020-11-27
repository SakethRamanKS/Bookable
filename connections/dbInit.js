/*
The file where the models are initialised
All the models in the models folder and imported and synced with the database
*/


var User = require('../models/userModel');
var Customer = require('../models/customerModel');
var Manager = require('../models/managerModel');
var Bookable = require('../models/bookableModel');
var Bus = require('../models/busModel');
var Flight = require('../models/flightModel');
var Booking = require('../models/bookingsModel');
const BookedSeats = require('../models/bookedSeats');


async function init()
{
    await User.sync();
    await Customer.sync();
    await Manager.sync();
    await Bookable.sync();
    await Bus.sync();
    await Flight.sync();
    await Booking.sync();
    await BookedSeats.sync();
}

init();