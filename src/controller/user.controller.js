const { createController } = require('awilix-express');
const AppError = require("../common/error");

class UserController {
    constructor({ userService }) {
        this.userService = userService;
    }

    async getAll(req, res) {
        try {
            const result = await this.userService.getAll();
            res.send(result);
        } catch (error) {
            res.send(error);
        }
    }

    async getById(req, res) {
        try {
            const result = await this.userService.getById(req.params.id);
            res.send(result);
        } catch (error) {
            res.send(error);
        }
    }

    async create(req, res) {
        try {
            const result = await this.userService.create(req.body);
            res.send(result);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(400);
                res.send(error);
            } else {
                throw error;
            }
        }
    }

    async update(req, res) {
        try {
            await this.userService.update(req.params.id, req.body);
            res.send(204);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(400);
                res.send(error);
            } else {
                throw error;
            }
        }
    }

    async delete(req, res) {
        try {
            await this.userService.delete(req.params.id);

            res.status(204);
            res.end();
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = createController(UserController)
    .prefix('/users')
    .get('', 'getAll')
    .get('/:id', 'getById')
    .post('', 'create')
    .put('/:id', 'update')
    .delete('/:id', 'delete');