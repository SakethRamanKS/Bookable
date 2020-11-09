const {DataTypes} = require('sequelize');
let sequelize = require('../connections/dbConnection.js');

const Bus = sequelize.define('Bus', {
    BusNumber: DataTypes.STRING,
    SeatType: DataTypes.BOOLEAN,
    AcType: DataTypes.BOOLEAN
});

module.exports = Bus;