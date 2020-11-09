const {DataTypes } = require('sequelize');
let sequelize = require('../connections/dbConnection.js');

let Booking = require('./bookingsModel');

const BookedSeats = sequelize.define('BookedSeats', {
    SeatNum: DataTypes.INTEGER
});

BookedSeats.belongsTo(Booking);
Booking.hasMany(BookedSeats);

module.exports = BookedSeats;