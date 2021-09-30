/* eslint-disable class-methods-use-this */
const userData = require("../persistence/context");
const guid = require("../common/guid");
const schema = require("./schema");
const AppError = require("../common/exception");

class UserService {
    getAll() {
        return userData;
    }

    _getIndex(id) {
        return userData.findIndex((data) => data.id.toString() === id.toString());
    }

    getById(id) {
        const index = this._getIndex(id);
        return userData[index];
    }

    create(data) {
        data.id = guid();

        const { error } = schema.user.validate(data);

        if (error) {
            throw new AppError('ERR_USER_VALIDATION', error.details[0].message);
        }

        userData.push(data);
        return data;
    }

    update(id, data) {
        const { error } = schema.user.validate(data);

        if (error) {
            return { status: 400, message: error.details[0].message };
        }

        const index = this._getIndex(id);
        userData[index].userName = data.userName;
        userData[index].name = data.name;
        userData[index].email = data.email;
        userData[index].createDate = data.createDate;
        userData[index].password = data.password;

        return { status: 204, message: 'update successful' };
    }

    delete(id) {
        const index = this._getIndex(id);
        userData.splice(index, 1);
    }
}

module.exports = new UserService();