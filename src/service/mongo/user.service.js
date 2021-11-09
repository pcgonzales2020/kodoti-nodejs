const { UserModel } = require("./models/schema");
const schema = require("../schema");
const AppError = require("../../common/error");

class UserService {
    async getAll() {
        return UserModel.find();
    }

    async getById(id) {
        return UserModel.findOne({ _id: id });
    }

    async create(data) {
        const { error } = schema.user.validate(data);

        if (error) {
            throw new AppError('ERR_USER_VALIDATION', error.details[0].message);
        }

        await this._validateUsername(data.username);

        const user = {
            username: data.username,
            name: data.name,
            email: data.email,
            password: data.password
        };

        return UserModel(user).save();
    }

    async update(id, data) {
        const { error } = schema.user.validate(data);

        if (error) {
            throw new AppError('ERR_USER_VALIDATION', error.details[0].message);
        }

        await this._validateUsername(data.username, id);

        const record = await UserModel.findById(id);
        record.username = data.username;
        record.name = data.name;
        record.email = data.email;
        record.password = data.password;

        await record.save();
    }

    async delete(id) {
        const result = await UserModel.findById(id);
        await result.remove();
    }

    async _validateUsername(username, id = undefined) {
        const filter = {
            username
        };

        if (id) {
            filter._id = { $ne: id };
        }

        const user = await UserModel.findOne(filter);

        if (user) {
            throw new AppError('ERR_USERNAME_TAKEN', 'Username has been taken');
        }
    }
}

module.exports = UserService;