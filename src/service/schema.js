const joi = require('joi');

module.exports = {
    user: joi.object({
        id: joi.string(),
        username: joi.string().trim(),
        name: joi.string().trim(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: joi.string().trim().required(),
        createDate: joi.date(),
    }),
};