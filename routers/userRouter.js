const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');

let userRouter = express.Router();

userRouter.use(bodyParser.json());

let user = require('../models/userModel.js');
let customer = require('../models/customerModel.js');
let manager = require('../models/managerModel');


userRouter.route('/login')
// Endpoint for user login
.post(async (req, res) => {

	let row = await user.findOne({where:{Email:req.body.Email}});

	// Checking if the email is valid
	if(!row)
	{
		console.log("Invalid username");
		res.status(404).end();
		return;
	}

	// Checking if the password is valid
	bcrypt.compare(req.body.Password, row.Password, async function(error, result)
	{
		if(result)
		{
			console.log("Login success");

			res.cookie('id', row.id, {signed: true});

			if(row.Type == 0)
			{
				let cust = await row.getCustomer();
				res.cookie('custId', cust.id, {signed:true});
			}

			if(row.Type == 1)
			{
				let man = await row.getManager();
				res.cookie('manId', man.id, {signed: true});
			}

			res.status(200).end();
		}
		else
		{
			console.log("Wrong password");
			res.status(403).end();
		}
	});
});

userRouter.route("/")
// Creating a new user - Registration
.post(async (req, res) => 
{
	try 
	{
		let newuser = await user.create(req.body);
	}
	catch(e)
	{
		res.status(500).send(e.toString()).end();
	}

	// Based on the type of the user, a Customer profile or Manager profile is created accordingly
	if(req.body.Type == 0)
	{
		await newuser.createCustomer(req.body);
		let cust = await newuser.getCustomer();
		console.log(cust.toJSON());
	}
	if(req.body.Type == 1)
	{
		await newuser.createManager(req.body);
		let manager = await newuser.getManager();
		console.log(manager.toJSON());
	}
	
	res.status(201).send("User created").end();
})
// Retrieving the details of a user profile
.get(async (req, res) =>
{
	let row = await user.findByPk(req.signedCookies['id'], {include: [customer, manager]});

	if(row == null)
		res.status(404).end();
	else
		res.status(200).json(row).end();
});



module.exports = userRouter;