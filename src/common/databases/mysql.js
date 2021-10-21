const mysql = require('mysql');
const cfg = require('../../../config');

const connect = mysql.createConnection({
    host: cfg.mysql.host,
    user: cfg.mysql.user,
    password: cfg.mysql.password,
    database: cfg.mysql.database
});

connect.connect((error) => {
    if (error) {
        throw error;
    } else {
        console.log('Connect Database');
    }
});

module.exports = connect;