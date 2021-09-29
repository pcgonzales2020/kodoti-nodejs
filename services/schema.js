const joi = require('joi');

const schemas = {
    user: joi.object({
        id: joi.string(),
        userName: joi.string().trim(),
        name: joi.string().trim(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: joi.string().trim().required(),
        createDate: joi.date(),
    }),
};

module.exports = schemas;