/* eslint-disable class-methods-use-this */
const userData = require("../db/context");

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
        userData.push(data);
        return data;
    }

    update(id, data) {
        const index = this._getIndex(id);
        userData[index].userName = data.userName;
        userData[index].name = data.name;
        userData[index].email = data.email;
        userData[index].createDate = data.createDate;
        userData[index].password = data.password;
    }

    delete(id) {
        const index = this._getIndex(id);
        userData.splice(index, 1);
    }
}

module.exports = new UserService();