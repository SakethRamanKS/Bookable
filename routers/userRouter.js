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
	
	let newuser = await user.create(req.body);
	
	if(req.body.Type == 0)
	{
		let newcust = await customer.create(req.body);
		newuser.createCustomer(newcust);
	}
	if(req.body.Type == 1)
	{
		let newman = await manager.create(req.body);
		newuser.createManager(newman);
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