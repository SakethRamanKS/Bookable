const express = require('express');
const bodyParser = require('body-parser')
const sql = require('../sqlCon.js');

let bookableRouter = express.Router();

bookableRouter.use(bodyParser.json());

bookableRouter.route("/")

.get((req, res) => {

	let query = 'SELECT * FROM Bookable';
	sql.init(function(con)
	{
		con.query(query, function(error, result)
		{
			if(error)
				res.status(500).send(error).end();
			else
				res.status(200).send(result).end();
		});
	});

});


module.exports = bookableRouter;