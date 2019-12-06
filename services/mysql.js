const Bluebird = require('bluebird');
const mysql = require('mysql');

// --------------------------------------------------------------------------------------------------

// const {connection} = require('../config/sqlConfig');
const connection = mysql.createConnection({
    // Setup environment variables for elastic beanstalk
    host: process.env.MYSQL_SERVER,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
});

connection.connect();   // Connect to DB
connection.escape();    // Prevent SQL injection attacks
const db = Bluebird.promisifyAll(connection);   // Promisify all library functions

// --------------------------------------------------------------------------------------------------

const searchTable = (dbName, tblName, column, value, like=false) => {
    let sql = `SELECT * FROM ${dbName}.${tblName} WHERE ${column} `;
    (like) ? sql += `LIKE '%${value}%';` : sql += `= '${value}';`;
    console.log('SQL: ', sql);
    return db.queryAsync(sql);
};


module.exports = {
    searchTable
};


