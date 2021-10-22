const guid = require("../../common/guid");
const schema = require("../schema");
const AppError = require("../../common/error");
const MysqlString = require("./executeMysql");

class UserService {
    getAll() {
        return MysqlString('select * from user');
    }

    getById(id) {
        return MysqlString(`select * from user where id=${id}`);
    }

    create(data) {
        data.id = guid();

        const { error } = schema.user.validate(data);

        if (error) {
            throw new AppError('ERR_USER_VALIDATION', error.details[0].message);
        }

        return MysqlString(`insert into user values (
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

        return MysqlString(`update user set 
                                        userName='${data.userName}'
                                        ,name = '${data.name}'
                                        ,email = '${data.email}'
                                        ,createDate = '${data.createDate}'
                                        ,password = '${data.password}' 
                                where id = '${id}'`);
    }

    delete(id) {
        return MysqlString(`delete from user where id = '${id}'`);
    }
}

module.exports = UserService;