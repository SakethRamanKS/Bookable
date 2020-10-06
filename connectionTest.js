//Importing the mysql and express modules
let mysql = require('mysql');
const express = require('express');
const app = express();

//Defining connection parameters
let con = mysql.createConnection(
    {
        host: "localhost",
        user: "node",
        password: "bookable",
        database: "Bookable"
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

let q1 = 'SELECT * FROM test;';

//Express handling GET
app.get('/', function(req, res)
{
    con.query(q1, function(err, result)
    {
        if(err)
            res.status(500).send("Database error").end();
        else
        {
            res.json(result);
        }
    });
});

app.listen(3000, function(){
    console.log("Server listening on port 3000");
});
