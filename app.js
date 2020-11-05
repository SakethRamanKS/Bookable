//Importing the mysql and express modules
const conn = require('./connections/dbConnection.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser =  require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('./static/html'));
app.use(express.static('./static/css'));
app.use(express.static('./static/js'));
app.use(express.static('./static/Image'));

//Inclduing and mounting routers
let userRouter = require('./routers/userRouter.js');


app.use('/user', userRouter);



app.listen(3000, function(){
    console.log("Server listening on port 3000");
});

