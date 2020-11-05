const express = require('express');
const bodyParser = require('body-parser')

let userRouter = express.Router();

userRouter.use(bodyParser.json());

let conn = require('../connections/dbConnection.js');
let user = require('../models/userModel.js');

userRouter.route("/")
.post(async (req, res) => {

	console.log(req.body);
	console.log("Received POST request at /user with request body: " + req.body);
	
	await user.create(
		{
			Username: req.body.Username,
			Password: req.body.Password,
			Email: req.body.Email,
			Type: req.body.Type
		}
	);

	res.status(201).send("User created").end();
});

userRouter.route('/:userId')
.get(async (req, res) => {

	let row = await user.findByPk(req.params.userId);
	res.status(200).json(row.toJSON()).end();
});

module.exports = userRouter;