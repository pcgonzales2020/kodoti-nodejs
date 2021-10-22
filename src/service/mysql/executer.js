const mysql = require('../../common/databases/mysql');

module.exports = function (sentence) {
    return new Promise((resolve, reject) => {
        mysql.query(sentence, (error, result) => {
            if (error) {
                reject(error);
            }

            resolve(result);
        });
    });
};