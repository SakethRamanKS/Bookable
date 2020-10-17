//Importing the mysql and express modules
let sql = require('./sqlCon.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser =  require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('static'));

//Inclduing and mounting routers
let userRouter = require('./routers/userRouter.js');
let bookableRouter = require('./routers/bookableRouter.js');

app.use('/user', userRouter);
app.use('/bookable', bookableRouter);


app.listen(3000, function(){
    console.log("Server listening on port 3000");
});
