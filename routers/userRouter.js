const express = require('express');
const bodyParser = require('body-parser')
const sql = require('../sqlCon.js');

let userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route("/")
.post((req, res) => {

	let query = `INSERT INTO Users(Username, Email, Password, Type) VALUES('${req.body.Username}', '${req.body.Email}', '${req.body.Password}', ${req.body.Type})`;

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

module.exports = userRouter;