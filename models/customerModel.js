// Model to define a customer

const {DataTypes } = require('sequelize');

let User = require('./userModel.js');

let sequelize = require('../connections/dbConnection.js');

const Customer = sequelize.define('Customer', {
    DoB: DataTypes.DATE,
    Gender: DataTypes.INTEGER
});

// Customer is a subclass of User

Customer.belongsTo(User);
User.hasOne(Customer);



module.exports = Customer;