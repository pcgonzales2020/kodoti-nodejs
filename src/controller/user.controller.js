console.log('x');

const { createController } = require('awilix-express');
const AppError = require("../common/error");

class UserController {
    constructor({ userService }) {
        this.userService = userService;
    }

    getAll(req, res) {
        const result = this.userService.getAll();

        res.send(result);
    }

    getById(req, res) {
        const result = this.userService.getById(req.params.id);

        res.send(result);
    }

    create(req, res) {
        try {
            const result = this.userService.create(req.body);
            res.send(result);
        } catch (error) {
            if (error instanceof AppError) {
                if (error.code === 'ERR_USER_VALIDATION') {
                    res.status(400);
                    res.send(error);
                }
            } else {
                throw error;
            }
        }
    }

    update(req, res) {
        try {
            this.userService.update(req.params.id, req.body);
            res.send();
        } catch (error) {
            if (error instanceof AppError) {
                if (error.code === 'ERR_USER_VALIDATION') {
                    res.status(400);
                    res.send(error);
                }
            } else {
                throw error;
            }
        }
    }

    delete(req, res) {
        this.userService.delete(req.params.id);

        res.status(204);
        res.end();
    }
}

module.exports = createController(UserController)
    .prefix('/users')
    .get('', 'getAll')
    .get('/:id', 'getById')
    .post('', 'create')
    .put('/:id', 'update')
    .delete('/:id', 'delete');