const {decodeJWT} = require("../utils");

module.exports.cookieManager =()=>{

return (req,res,next)=>{

    const cookie = req.cookies.jwt;

    if(!cookie) return next();

    let decodedToken = decodeJWT(cookie);

    if(decodedToken)
         req.session = {passport:{user:{voterId:decodedToken.voterId,id:decodedToken.id}}};
    next();
};

}



module.exports.isAuth =()=>{
    return (req,res,next)=>{
      
      if(!req.user) return res.redirect("/admin/login");

      if(req.user.voterId) return res.redirect("/dashboard");

      next();
    }
}


module.exports.isVoter =()=>{
  return (req,res,next)=>{

    if(!req.user) return res.redirect("/login");

    if(req.user.voterId) return next()

    res.redirect("/admin/dashboard");
  }
}