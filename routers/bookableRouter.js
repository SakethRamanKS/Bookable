const express = require('express');
const bodyParser = require('body-parser')

let bookableRouter = express.Router();

bookableRouter.use(bodyParser.json());

const Bookable = require('../models/bookableModel');
const Flight = require('../models/flightModel');
const Bus = require('../models/busModel');
const Manager = require('../models/managerModel');


bookableRouter.route("/")

.get(async (req, res) => {
	console.log("LOGGING QUERY");
	console.log(req.query.where);
	let result = await Bookable.findAll({include: [Flight, Bus], where: req.query.where, attributes: req.body.attributes});
	if(!result)
	{
		console.log("EMPTY RESULT");
		res.status(200).end();
	}
	console.log("RESULT: ");
	console.log(JSON.stringify(result));
	res.status(200).json(result).end();
})

.post (async (req, res) => {
	
	let row = await Bookable.create(req.body);
	
	if(req.body.Type == 0)
	{
		row.createBus(req.body);
	}
	if(req.body.Type == 1)
	{
		row.createFlight(req.body);
	}

	let manager = await Manager.findByPk(req.body.ManagerId);
	row.setManager(manager);
	manager.BookableCount ++;
	await manager.save();

	res.status(201).send("Bookable created").end();
});


module.exports = bookableRouter;