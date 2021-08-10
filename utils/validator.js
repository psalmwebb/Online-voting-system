
const Joi = require("@hapi/joi");

module.exports = (schema)=>{
   
    return (req,res,next)=>{

        const {value,error} = schema.validate(req.body);
        
        if(error) return res.json({error:error.details[0].message});

        next();
    }
}