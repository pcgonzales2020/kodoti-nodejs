const { asClass, asValue, ...awilix } = require('awilix');
const UserController = require('./controller/user.controller');
const UserService = require('./service/memory/user.service');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

// controllers
container.register('userController', asClass(UserController));

// services
container.register('userService', asClass(UserService));

module.exports = container;