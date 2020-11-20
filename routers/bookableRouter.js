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
	console.log(req.query.where);
	let result = await Bookable.findAll({include: [Flight, Bus, Manager], where: req.query.where, attributes: req.body.attributes});
	if(!result)
	{
		console.log("EMPTY RESULT");
		res.status(200).end();
	}
	// console.log("RESULT: ");
	// console.log(JSON.stringify(result));
	res.status(200).json(result).end();
})

.post (async (req, res) => {

	console.log('NEW BOOKABLE REQUEST');
	if(!req.signedCookies['manId'])
	{
		res.status(403).send("Forbidden").end();
		return;
	}
	req.body.ManagerId = req.signedCookies['manId'];
	console.log(req.body);
	let row;
	try
	{
		row = await Bookable.create(req.body);
	}
	catch(e)
	{
		res.status(500).send(e.toString()).end();
	}
	
	if(req.body.Type == 0)
	{
		await row.createBus(req.body);
	}
	if(req.body.Type == 1)
	{
		await row.createFlight(req.body);
	}

	let manager = await Manager.findByPk(req.body.ManagerId);
	row.setManager(manager);
	manager.BookableCount ++;
	await manager.save();

	res.status(201).send("Bookable created").end();
});


module.exports = bookableRouter;