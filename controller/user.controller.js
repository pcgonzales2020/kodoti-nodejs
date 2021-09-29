/* eslint-disable class-methods-use-this */
// const { restart } = require("nodemon");

const userService = require("../services/user.service");

class UserController {
    getAll(req, res) {
        const result = userService.getAll();

        res.send(result);
    }

    getById(req, res) {
        const result = userService.getById(req.params.id);

        res.send(result);
    }

    create(req, res) {
        const result = userService.create(req.body);

        res.status(result.status);

        if (result.status === 401) {
            res.send(result.message);
        } else {
            res.send(result.save);
        }
    }

    update(req, res) {
        const result = userService.update(req.params.id, req.body);
        res.status(result.status);
        res.send(result.message);
    }

    delete(req, res) {
        userService.delete(req.params.id);

        res.status(204);
        res.end();
    }
}

module.exports = new UserController();