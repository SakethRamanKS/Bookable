const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');

let userRouter = express.Router();

userRouter.use(bodyParser.json());

let user = require('../models/userModel.js');
let customer = require('../models/customerModel.js');
let manager = require('../models/managerModel');


userRouter.route('/login')
.post(async (req, res) => {

	console.log("Login Request");
	console.log(req.body);

	let row = await user.findOne({where:{Email:req.body.Email}});

	if(!row)
	{
		console.log("Invalid username");
		res.status(404).end();
		return;
	}

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
.post(async (req, res) => 
{
	console.log(req.body);
	console.log(req.url);


	console.log("Received POST request at /user with request body: " + req.body);

	let newuser = await user.create(req.body);

	
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
.get(async (req, res) =>
{
	console.log("GOT REQUEST FOR USER ID");

	let row = await user.findByPk(req.signedCookies['id'], {include: [customer, manager]});

	if(row == null)
		res.status(404).end();
	else
	{
		// console.log(row.toJSON());
		res.status(200).json(row).end();
	}
});



module.exports = userRouter;