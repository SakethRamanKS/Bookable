const express = require('express');
const bodyParser = require('body-parser')

let userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route("/")
.post((req, res) => {
	let query = `INSERT INTO Users VALUES(${req.body.ID}, '${req.body.Username}', '${req.body.Email}', '${req.body.Password}', ${req.body.Type})`;
	res.status(200).send(query).end();
});

module.exports = userRouter;