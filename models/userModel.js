// A model to define a User
// A user can be a customer or a maanger

const {DataTypes } = require('sequelize');
let bcrypt = require('bcrypt');

let sequelize = require('../connections/dbConnection.js');

const User = sequelize.define('User', {
	Username:
	{
		type: DataTypes.STRING(20),
		allowNull: false
	},
	Email:
	{
		type: DataTypes.STRING,
		allowNull: false
	},
	Password:
	{
		type: DataTypes.STRING,
		allowNull: false
	},
	Type:
	{
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
});

// Adding a beforeCreate hook to the User model that hashes the password before saving it to the database

User.addHook('beforeCreate', async (user) => {
	user.Password = await bcrypt.hash(user.Password, 10);
});

module.exports =  User;