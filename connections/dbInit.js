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
    //await delAll();
    await User.sync();
    await Customer.sync();
    await Manager.sync();
    await Bookable.sync();
    await Bus.sync();
    await Flight.sync();
    await Booking.sync();
    await BookedSeats.sync();
}

async function delAll()
{   
    await BookedSeats.drop();
    await Booking.drop();

    await Bus.drop();
    await Flight.drop();
    await Bookable.drop();

    await Customer.drop();
    await Manager.drop();
    await User.drop();
    
}

init();