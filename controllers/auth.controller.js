
const Voter = require("../models/m.voter");
const Admin = require("../models/m.admin");
const {generateJWT} = require("../utils");


module.exports = class{

    static get addAdmin()
    {
        return async function(req,res){
           
            let {username,password} = req.body;

            const admin = await Admin.create({username,password});

            console.log(admin)

            let encodedToken = generateJWT({id:admin.id});

            res.cookie("jwt",encodedToken,{ httpOnly:true,maxAge:3000 * 60 * 60 * 24});

            res.status(200).json(admin)
        }
    }
}