// A model to define a Travel Manager

const {DataTypes } = require('sequelize');

let User = require('./userModel.js');
let Bookable = require('./bookableModel');

let sequelize = require('../connections/dbConnection.js');

const Manager = sequelize.define('Manager', {
    TravelName: DataTypes.STRING,
    BookableCount: DataTypes.INTEGER
});

// Manager is a subclass of User

Manager.belongsTo(User);
User.hasOne(Manager);

Manager.hasMany(Bookable);
Bookable.belongsTo(Manager);

module.exports = Manager;