const express = require('express');
const bodyParser = require('body-parser')

let bookableRouter = express.Router();

bookableRouter.use(bodyParser.json());

const Bookable = require('../models/bookableModel');
const Flight = require('../models/flightModel');
const Bus = require('../models/busModel');

bookableRouter.route("/")

.get(async (req, res) => {
	let result = await Bookable.findAll({include: [Flight, Bus]});

	res.status(200).json(result).end();
})

.post (async (req, res) => {
	
	let row = await Bookable.create(req.body);
	
	if(req.body.Type == 0)
	{
		let newbus = await Bus.create(req.body);
		row.createBus(newbus);
	}
	if(req.body.Type == 1)
	{
		let newflight = await Flight.create(req.body);
		row.createFlight(newflight);
	}

	res.status(201).send("Bookable created").end();
});


module.exports = bookableRouter;