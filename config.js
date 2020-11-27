let dotenv = require('dotenv')
dotenv.config();

module.exports  =
{
    dbName: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dbHost: process.env.DB_HOST
};