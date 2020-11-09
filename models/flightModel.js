const {DataTypes} = require('sequelize');
let sequelize = require('../connections/dbConnection.js');

const Flight = sequelize.define('Flight', {
    FlightNumber: DataTypes.STRING,
    SrcAirport: DataTypes.STRING,
    DestAirport: DataTypes.STRING
});

module.exports = Flight;