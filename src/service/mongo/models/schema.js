const mongo = require('../../../common/databases/mongo');

const { Schema } = mongo;

const userSchema = new Schema({
    username: String,
    name: String,
    email: String,
    create_date: Date,
    password: String
});

const UserModel = mongo.model('user', userSchema);

module.exports = {
    UserModel
};