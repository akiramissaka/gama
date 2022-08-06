const { validate, Joi } = require('express-validation');

module.exports = validate({
    body: Joi.object({
        nome: Joi.string().max(100).required(),
        email: Joi.string().max(100).email().required(),
        senha: Joi.string().min(6).required(),
        apresentacao: Joi.string().max(1000).required()
    })
})