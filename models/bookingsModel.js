const {DataTypes } = require('sequelize');
let sequelize = require('../connections/dbConnection.js');

let Customer = require('./customerModel');
let Bookable = require('./bookableModel');

const Bookings = sequelize.define('Booking', {
    TXNId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
});


Customer.belongsToMany(Bookable, {through: Bookings});
Bookable.belongsToMany(Customer, {through: Bookings});

module.exports = Bookings;