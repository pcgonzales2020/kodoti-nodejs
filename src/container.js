const { asClass, asValue, ...awilix } = require('awilix');
const UserService = require('./service/memory/user.service');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

// services
container.register('userService', asClass(UserService));

module.exports = container;