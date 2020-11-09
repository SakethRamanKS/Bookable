const {DataTypes } = require('sequelize');

let User = require('./userModel.js');
let Bookable = require('./bookableModel');

let sequelize = require('../connections/dbConnection.js');

const Manager = sequelize.define('Manager', {
    TravelName: DataTypes.STRING,
    BookableCount: DataTypes.INTEGER
});

Manager.belongsTo(User);
User.hasOne(Manager);

Manager.hasMany(Bookable);
Bookable.belongsTo(Manager);

module.exports = Manager;