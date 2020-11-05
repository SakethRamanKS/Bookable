const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('sakethr_Bookable', 'sakethr_node', 'NodePass1', {
  host: 'sakethr.heliohost.us',
  dialect: 'mysql'
}, 
{
  define: {
    freezeTableName: true
}});

init();

async function init()
{
	try
	{
		await sequelize.authenticate();
		console.log("Connection succuess");
		run();
	}
	catch (error)
	{
		console.log("Error: " + error);
	}
}

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


async function run()
{
	let row = User.findByPk(1);
	console.log(row.toJSON());
}
