const express = require("express"); 
const router = require("express").Router();

const controller = require("../controllers/auth.controller");

const passport = require("passport");

const {generateJWT} = require("../utils");

const validate = require("../utils/validator");

const schema = require("../utils/authSchema");


require("../config/passport.config");


router.post("/add-admin",[express.json(),express.urlencoded({extended:false}),controller.addAdmin]);



router.route("/admin/login").post([express.json(),validate(schema.adminLoginSchema),passport.authenticate("local.admin")],(req,res)=>{

    const obj  = {id:req.user.id,voterId:req.user.voterId}

    const encodedToken = generateJWT(obj);

    res.cookie("jwt",encodedToken,{httpOnly:true,maxAge:1000 * 24 * 60 * 60});

    res.json({success:"Successfully authenticated"});
});


router.route("/login")

.post(express.json(),validate(schema.loginSchema),passport.authenticate("local.voter",
{failureRedirect:""}),(req,res)=>{
    
    let encodedToken = generateJWT(req.session.passport.user);

    res.cookie("jwt",encodedToken,{ httpOnly:true,maxAge:3000 * 60 * 60 * 24});

    res.json({success:"Successfully authenticated"});
    
});


module.exports = router;