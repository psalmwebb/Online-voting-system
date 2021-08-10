
const jwt = require("jsonwebtoken");


const SECRET_KEY = "ps";


module.exports.generateJWT=(token)=>{
   
    return jwt.sign({id:token.id,voterId:token.voterId},SECRET_KEY,{
        expiresIn: 3000 * 24 * 60 * 60
    })
    
}


module.exports.decodeJWT=(token)=>{
   
    let decodedToken = null;
    jwt.verify(token,SECRET_KEY,(err,data)=>{

        if(err) return

       decodedToken = data
    });

    return decodedToken;
}
