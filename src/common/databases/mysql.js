const mysql = require('mysql');
const cfg = require('../../../config') ; 
const connect = mysql.createConnection({
    host: cfg.host,
    user: cfg.user,
    password: cfg.password,
    database: cfg.database
});

connect.connect((error) => {
    if (error) {
        throw error;
    } else {
        console.log('Connect Database');
    }
});

module.exports = connect;