const mysql = require('../../common/databases/mysql');

class UserService {
    async getAll() {
        return this._SQLString('select * from user');
    }

    async getById(id) {
        return this._SQLString(`select * from user where id=${id}`);
    }

    _SQLString(sentence) {
        return new Promise((resolve, reject) => {
            mysql.query(sentence, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }
}

module.exports = UserService;