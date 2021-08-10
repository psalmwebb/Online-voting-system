const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Admin = require("../models/m.admin");
const Voter = require("../models/m.voter");


const bcrypt = require("bcryptjs");

const customFields1 = {
    usernameField:"username",
    passwordField:"password",
    passReqToCallback:true
};

const customFields2 = {
    usernameField:"voterId",
    passwordField:"password",
    passReqToCallback:true
};


const strategy1 = new LocalStrategy(customFields1, async (req,username,password,done)=>{


     const admin = await Admin.findOne({username});
     
     if(admin){
        if(bcrypt.compareSync(password,admin.password)){
            done(null,admin);
        }else{
            return req.res.json({error:"Invalid Credentials"});
        } 
     }
     else{
        req.res.json({error:"Invalid Credentials"});
     }
});



const strategy2 = new LocalStrategy(customFields2, async (req,voterId,password,done)=>{

    const voter = await Voter.findOne({voterId});
    
    if(voter){
       if(bcrypt.compareSync(password,voter.password)){
          done(null,voter)
       } 
       else{
          return req.res.json({error:"Invalid Credentials"});
       }
    }
    else{
        req.res.json({error:"Invalid Credentials"});
    }
});





passport.use("local.admin",strategy1);
passport.use("local.voter",strategy2);

passport.serializeUser(function(user,done){

   const obj = {voterId:user.voterId,id:user.id};
   done(null,obj);
});


passport.deserializeUser(async function(obj,done){
     

     if(obj.voterId){
        // console.log("Voter");
        done(null,await Voter.findById(obj.id));
     }
     else{
        //  console.log("Admin");
         done(null,await Admin.findById(obj.id));
     }
     
})

