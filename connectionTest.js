//Importing the mysql and express modules
let mysql = require('mysql');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser =  require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('static'));

//Defining connection parameters
let con = mysql.createConnection(
    {
        host: "sql12.freemysqlhosting.net",
        user: "sql12369498",
        password: "e7xlPpldkD",
        database: "sql12369498"
    }
);

//Attempting to connect to the database
con.connect(function(err)
{
    //Terminating the program in case of an error
    if(err)
    {
        console.log("Error in connecting to db");
        con.end();
        process.exit(0);
    }

});


//Express handling GET
app.post('/insertTest', function(req, res)
{
    console.log("Request");
    console.log(req.body);
    let query = `INSERT INTO Bookable (TotSeat, Type, Owner, Src, Dest, Dep, Arr, Fare) VALUES ('${req.body.owner}', ${req.body.seatCount}, '${req.body.type}', '${req.body.src}', '${req.body.dest}', '${req.body.dep}', '${req.body.arr}', '${req.body.fare}')`;
    console.log(query);
    con.query(query, function(err, result)
    {

        if(err)
            res.status(500).send("Database error").end();
        else
        {
            res.status(200).end();
        }
    });
});

app.listen(3000, function(){
    console.log("Server listening on port 3000");
});
