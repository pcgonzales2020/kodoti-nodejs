const mysql = require('../../common/databases/mysql');
const guid = require("../../common/guid");
const schema = require("../schema");
const AppError = require("../../common/error");

class UserService {
    getAll() {
        return this._sqlString('select * from user');
    }

    getById(id) {
        return this._sqlString(`select * from user where id=${id}`);
    }

    create(data) {
        data.id = guid();

        const { error } = schema.user.validate(data);

        if (error) {
            throw new AppError('ERR_USER_VALIDATION', error.details[0].message);
        }

        return this._sqlString(`insert into user values (
                                            '${data.id}'
                                            ,'${data.userName}'
                                            ,'${data.name}'
                                            ,'${data.email}'
                                            ,'${data.createDate}'
                                            ,'${data.password}')`, data);
    }

    update(id, data) {
        const { error } = schema.user.validate(data);

        if (error) {
            throw new AppError('ERR_USER_VALIDATION', error.details[0].message);
        }

        return this._sqlString(`update user set 
                                        userName='${data.userName}'
                                        ,name = '${data.name}'
                                        ,email = '${data.email}'
                                        ,createDate = '${data.createDate}'
                                        ,password = '${data.password}' 
                                where id = '${id}'`);
    }

    delete(id) {
        return this._sqlString(`delete from user where id = '${id}'`);
    }

    _sqlString(sentence, response) {
        return new Promise((resolve, reject) => {
            mysql.query(sentence, (error, result) => {
                if (error) {
                    reject(error);
                }

                if (response) result = response;
                resolve(result);
            });
        });
    }
}

module.exports = UserService;