var mysql = require('mysql');

var con;
let connectCount = 0;

function init(callback)
{
    if(!connectCount)
    {
        con = mysql.createConnection(
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
            connectCount++;
            console.log("New Connection Created");
            callback(con);

        });
    }
    else
    {
        console.log("Sending existing connection");
        callback(con);
    }
}

module.exports = {init: init};