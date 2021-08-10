const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const voterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    voterId:{
        type:String,
        unique:true,
        required:true
    },
    password:{
      type:String,
      required:true
    },
    voted:{
        type:Boolean,
        default:false
    }
})



voterSchema.pre("save",function(){

    if(this.isNew){
        this.password = bcrypt.hashSync(this.password,bcrypt.genSaltSync());
    }
})



module.exports = mongoose.model("voters",voterSchema);