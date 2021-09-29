/* eslint-disable class-methods-use-this */
// const { restart } = require("nodemon");
const joi = require('joi');
const userService = require("../services/user.service");

const schema = joi.object({
    id: joi.string(),
    userName: joi.string().trim(),
    name: joi.string().trim(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: joi.string().trim().required(),
    createDate: joi.date(),
});

function createGuid() {
    function _p8(s) {
        const p = (`${Math.random().toString(16)} 000000000`).substr(2, 8);

        return s ? `-${p.substr(0, 4)}-${p.substr(4, 4)}` : p;
    }

    return _p8() + _p8(true) + _p8(true) + _p8();
}

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
        let result = '';
        const guid = createGuid();
        req.body.id = guid;

        const { error } = schema.validate(req.body);
        if (error) {
            res.status(401).json({ err: error.details[0].message });
            res.end();
        } else {
            res.status(201);
            result = userService.create(req.body);
            res.send(result);
        }
    }

    update(req, res) {
        const { error } = schema.validate(req.body);
        userService.update(req.params.id, req.body);
        if (error) {
            res.status(401).json({ err: error.details[0].message });
            res.end();
        } else {
            res.status(204);
            userService.update(req.params.id, req.body);
            res.end();
        }
    }

    delete(req, res) {
        userService.delete(req.params.id);

        res.status(204);
        res.end();
    }
}

module.exports = new UserController();