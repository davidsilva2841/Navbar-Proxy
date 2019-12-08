// Used for development
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'host url here',
    user: 'username',
    password: 'password'
});


module.exports = {
    connection
};
