const moment = require("moment");
const guid = require("../../common/guid");
const schema = require("../schema");
const AppError = require("../../common/error");
const executer = require("./executer");

class UserService {
    getAll() {
        return executer('select * from user');
    }

    getById(id) {
        return executer(`select * from user where id=${id}`);
    }

    create(data) {
        data.id = guid();

        const { error } = schema.user.validate(data);

        if (error) {
            throw new AppError('ERR_USER_VALIDATION', error.details[0].message);
        }

        const createDate = moment().format('YYYY/MM/DD HH:mm:ss');

        executer(`
            insert into user values (
                '${data.id}'
                ,'${data.userName}'
                ,'${data.name}'
                ,'${data.email}'
                ,'${createDate}'
                ,'${data.password}'
            )`);

        return data;
    }

    update(id, data) {
        const { error } = schema.user.validate(data);

        if (error) {
            throw new AppError('ERR_USER_VALIDATION', error.details[0].message);
        }

        executer(`
            update user 
                set username='${data.userName}'
                ,name = '${data.name}'
                ,email = '${data.email}'
                ,create_date = '${data.createDate}'
                ,password = '${data.password}' 
            where id = '${id}'`);
    }

    delete(id) {
        executer(`delete from user where id = '${id}'`);
    }
}

module.exports = UserService;