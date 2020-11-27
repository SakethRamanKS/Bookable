const express = require('express');
const bodyParser = require('body-parser')

let bookableRouter = express.Router();

bookableRouter.use(bodyParser.json());

// Importing the required models

const Bookable = require('../models/bookableModel');
const Flight = require('../models/flightModel');
const Bus = require('../models/busModel');
const Manager = require('../models/managerModel');


bookableRouter.route("/")
// Fetches all the Bookables from the database and returns it
.get(async (req, res) => {

	// SELECT * FROM Bookable NATURAL JOIN Bus NATURAL JOIN Flight NATURAL JOIN Manager
	let result = await Bookable.findAll({include: [Flight, Bus, Manager], where: req.query.where, attributes: req.body.attributes});
	if(!result)
	{
		console.log("EMPTY RESULT");
		res.status(200).end();
	}
	res.status(200).json(result).end();
})
// Creates a new Bookable and adds it to the database
.post (async (req, res) => {
	// Checking if the user is a travel manager authorised to add Bookables
	if(!req.signedCookies['manId'])
	{
		res.status(403).send("Forbidden").end();
		return;
	}
	req.body.ManagerId = req.signedCookies['manId'];
	let row;
	try
	{
		row = await Bookable.create(req.body); // INSERT INTO Bookable
	}
	catch(e)
	{
		res.status(500).send(e.toString()).end();
	}
	
	// According to the type of the newly created Bookable, a Bus or Flight is also added accordingly
	if(req.body.Type == 0)
	{
		await row.createBus(req.body); // INSERT INTO Bus
	}
	if(req.body.Type == 1)
	{
		await row.createFlight(req.body); // INSERT INTO Flight
	}

	// The details of the Manager who created the Bookable are fetched and the bookableCount is incremented
	let manager = await Manager.findByPk(req.body.ManagerId);
	row.setManager(manager);
	manager.BookableCount ++;
	await manager.save();

	res.status(201).send("Bookable created").end();
});


module.exports = bookableRouter;