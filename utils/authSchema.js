
const Joi = require("@hapi/joi");



module.exports = class{

    static get adminLoginSchema()
    {
        return Joi.object({
            username:Joi.string().required(),
            password:Joi.string().min(4).required()
        })
    }

    static get loginSchema()
    {  
        return Joi.object({
           voterId:Joi.string().required(),
           password:Joi.string().min(4).required()
        })
    }
}