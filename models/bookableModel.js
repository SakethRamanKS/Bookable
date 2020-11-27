// A model to define a bookable

const {DataTypes} = require('sequelize');
let sequelize = require('../connections/dbConnection.js');

const Bus = require('./busModel');
const Flight = require('./flightModel');

//Defining the model and specifying the attributes
const Bookable = sequelize.define('Bookable', {
    TotSeat: DataTypes.INTEGER,
    Type: DataTypes.BOOLEAN,
    Src: DataTypes.STRING,
    Dest: DataTypes.STRING,
    Dep: DataTypes.TIME,
    Arr: DataTypes.TIME,
    Fare: DataTypes.INTEGER
});

// Establishing relationships with Bus model and Flight model

Bookable.hasOne(Bus);
Bus.belongsTo(Bookable);

Bookable.hasOne(Flight);
Flight.belongsTo(Bookable);

module.exports = Bookable;