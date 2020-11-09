const express = require('express');
const bodyParser = require('body-parser')
let customerController = require('../controllers/customerController');
let managerController = require('../controllers/managerController');

let userRouter = express.Router();

userRouter.use(bodyParser.json());

let user = require('../models/userModel.js');
let customer = require('../models/customerModel.js');
let manager = require('../models/managerModel');

userRouter.route("/")
.post(async (req, res) => {

	console.log(req.body);
	console.log("Received POST request at /user with request body: " + req.body);
	
	let newuser = await user.create(
		{
			Username: req.body.Username,
			Password: req.body.Password,
			Email: req.body.Email,
			Type: req.body.Type
		}
	);
	
	if(req.body.Type == 0)
		await customerController.createCustomer(req, newuser.id);
	if(req.body.Type == 1)
		await managerController.createManager(req, newuser.id);

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