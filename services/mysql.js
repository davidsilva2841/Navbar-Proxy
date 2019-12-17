const Bluebird = require('bluebird');
const mysql = require('mysql');

// --------------------------------------------------------------------------------------------------

if (process.env.NODE_ENV === 'production') {
    var connection = mysql.createConnection({
        // Setup environment variables for elastic beanstalk
        host: process.env.MYSQL_SERVER,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD
    });

} else if (process.env.NODE_ENV === 'development') {
    // See Navbar-Proxy/config/sqlConfig.example.js for how to setup
    var {connection} = require('../config/sqlConfig');
}

connection.connect();   // Connect to DB
connection.escape();    // Prevent SQL injection attacks
const db = Bluebird.promisifyAll(connection);   // Promisify all library functions

// --------------------------------------------------------------------------------------------------

const searchTable = (dbName, tblName, column, value, like=false) => {
    let sql = `SELECT * FROM ${dbName}.${tblName} WHERE ${column} `;
    (like) ? sql += `LIKE '%${value}%';` : sql += `= '${value}';`;
    return db.queryAsync(sql);
};

module.exports = {
    searchTable
};


