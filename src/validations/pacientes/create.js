const { validate, Joi } = require('express-validation');

module.exports = validate({
    body: Joi.object({
        nome: Joi.string().max(100).required(),
        email: Joi.string().max(100).email().required(),
        idade: Joi.date().required(),
        //idade: Joi.date().format('dd-mm-yyyy').required()
    })
})