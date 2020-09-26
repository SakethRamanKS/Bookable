const mysql = require('mysql');

let con = mysql.createConnection(
    {
        host: "localhost",
        user: "node",
        password: "bookable"
    }
);

con.connect(function(err)
{
    if(err) 
    {
        console.log("Error in connecting to db");
        con.end();
        process.exit(0);
    }
    connSuccess();
});

let q1 = "SHOW DATABASES";

function connSuccess()
{
    con.query(q1, function(error, results)
    {
        console.log("Query");
        if(error) throw error;
        console.log(results);
        process.exit(0);
    });
}