// A model to represent a seat that has been booked

const {DataTypes } = require('sequelize');
let sequelize = require('../connections/dbConnection.js');

let Booking = require('./bookingsModel');

const BookedSeats = sequelize.define('BookedSeats', {
    SeatNum: DataTypes.INTEGER
});

//Defining the relationship with the Booking model

BookedSeats.belongsTo(Booking);
Booking.hasMany(BookedSeats);

module.exports = BookedSeats;