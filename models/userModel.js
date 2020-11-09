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

User.addHook('beforeCreate', async (user) => {
	user.Password = await bcrypt.hash(user.Password, 10);
});

module.exports =  User;