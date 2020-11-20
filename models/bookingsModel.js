// A model to define a booking transaction

const {DataTypes } = require('sequelize');
let sequelize = require('../connections/dbConnection.js');

let Customer = require('./customerModel');
let Bookable = require('./bookableModel');

// Defining the model with its attributes
const Bookings = sequelize.define('Booking', {
    TXNId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

// Defining the relationship: The Bookable and Customer table are connected through an M:N relationship
// Booking table acts as an intermediate table

Customer.belongsToMany(Bookable, {through: Bookings});
Bookable.belongsToMany(Customer, {through: Bookings});

module.exports = Bookings;