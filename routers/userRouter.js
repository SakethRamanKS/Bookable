const express = require('express');
const bodyParser = require('body-parser')

let userRouter = express.Router();

userRouter.use(bodyParser.json());

let user = require('../models/userModel.js');
let customer = require('../models/customerModel.js');
let manager = require('../models/managerModel');

userRouter.route("/")
.post(async (req, res) => {

	console.log(req.body);
	console.log("Received POST request at /user with request body: " + req.body);
	res.status(200).end();
	let newuser = await user.create(req.body);

	res.cookie('id', newuser.id, {signed:true});
	
	if(req.body.Type == 0)
	{
		await newuser.createCustomer(req.body);
		let cust = await newuser.getCustomer();
		console.log(cust.toJSON());
		res.cookie('custId', cust.id, {signed: true});
	}
	if(req.body.Type == 1)
	{
		await newuser.createManager(req.body);
		let manager = await newuser.getManager();
		console.log(manager.toJSON());
		res.cookie('manId', manager.id, {signed: true});
	}
	
	res.status(201).send("User created").end();
});

userRouter.route('/:userId')
.get(async (req, res) => {

	let row = await user.findByPk(req.params.userId, {include: [customer, manager]});
	console.log(row.toJSON());
	
	if(row == null)
		res.status(404).end();
	else
		res.status(200).json(row).end();
});

module.exports = userRouter;