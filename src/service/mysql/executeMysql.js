const mysql = require('../../common/databases/mysql');

module.exports = function (sentence, response) {
    return new Promise((resolve, reject) => {
        mysql.query(sentence, (error, result) => {
            if (error) {
                reject(error);
            }

            if (response) result = response;
            resolve(result);
        });
    });
};