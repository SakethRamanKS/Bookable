//Importing the mysql and express modules
const conn = require('./connections/dbConnection.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser =  require('body-parser');
const path = require('path');


app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser('SSH'));

app.get('/', (req, res) => 
{
	res.redirect('./homepage.htm');
});

function auth(req, res, next)
{
	// console.log("Logging cookies");
	// console.log(req.signedCookies);
	if(!req.signedCookies['id'])
	{
		if(req.url.startsWith('/homepage') || req.url == '/basic.css' || req.url == '/' || req.url.endsWith("jpg") || req.url.startsWith('/user'))
			next();
		else
		{
			console.log("USER BLOCKED");
			res.status(404).sendFile(path.join(__dirname, 'static', 'html', '404.htm'));
		}
	}	
	else
	{
		console.log("USER AUTHENTICATED");
		next();
	}
}

app.use(auth);

app.use(express.static('./static/html'));
app.use(express.static('./static/css'));
app.use(express.static('./static/js'));
app.use(express.static('./static/Image'));



//Inclduing and mounting routers
let userRouter = require('./routers/userRouter.js');
let bookableRouter = require('./routers/bookableRouter');
const bookingsRouter = require('./routers/bookingsRouter.js');
const bookedseatRouter = require('./routers/bookedseatRouter.js');


app.use('/user', userRouter);

app.use('/bookable', bookableRouter);
app.use('/bookings', bookingsRouter);
app.use('/bookedseats', bookedseatRouter);

app.listen(3000, function(){
    console.log("Server listening on port 3000");
});

const conn2 = require('./connections/dbInit.js');


