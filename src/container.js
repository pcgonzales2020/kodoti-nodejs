const { asClass, asValue, ...awilix } = require('awilix');
const UserService = require('./service/mongo/user.service');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

// services
container.register('userService', asClass(UserService).scoped());

module.exports = container;