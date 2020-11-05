const express = require('express');
const bodyParser = require('body-parser')

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

})

.post ((req, res) => {

	let inp = req.body;
	let query = `INSERT INTO Bookable (TotSeat, Type, Owner, Src, Dest, Dep, Arr, Fare) VALUES(${inp.TotSeat}, ${inp.Type}, '${inp.Owner}', '${inp.Src}', '${inp.Dest}', '${inp.Dep}', '${inp.Arr}', ${inp.Fare});`;
	sql.init(function(con)
	{
		con.query(query, function(error, result)
		{
			if(error)
				res.status(500).send(error).end();
			else
				res.status(201).send(result).end();
		});
	});
});


module.exports = bookableRouter;