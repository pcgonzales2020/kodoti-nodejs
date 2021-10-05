/* eslint-disable class-methods-use-this */
// const { restart } = require("nodemon");

const AppError = require("../../common/error");
const userService = require("../../service/memory/user.service");

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
        try {
            const result = userService.create(req.body);
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
            const result = userService.update(req.params.id, req.body);
            res.status(result.status);
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
        userService.delete(req.params.id);

        res.status(204);
        res.end();
    }
}

module.exports = new UserController();