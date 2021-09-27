const userData = require("../db/context");

class UserService {
    GetAllUser() {
        return userData;
    }

    GetIndex(id) {
        return userData.findIndex((data) => {
            return data.id.toString() === id.toString();
        })
    }

    GetUserById(id) {
        let index = this.GetIndex(id);
        return userData[index];
    }

    CreateUser(data) {
        userData.push(data);
        return "Usuario Creado"
    }

    UpdateUserById(id, data) {
        let index = this.GetIndex(id);
        userData[index].userName = data.userName;
        userData[index].name = data.name;
        userData[index].email = data.email;
        userData[index].createDate = data.createDate;
        userData[index].password = data.password;
        return "Usuario actualizado";
    }

    DeleteUserById(id) {
        let index = this.GetIndex(id);
        userData.splice(index, 1)

        return "Usuario Eliminado";
    }
}

module.exports = new UserService();