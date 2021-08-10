

const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const adminSchema = new mongoose.Schema({
    username:{
       type:String,
       required:true,
       unique:true
    },
    password:{
      type:String,
      required:true,
    },
    voted:{
      type:Boolean,
      default:false
    }
})


adminSchema.pre("save",function(){

  if(this.isNew){
      this.password = bcrypt.hashSync(this.password,bcrypt.genSaltSync());
  }
})


module.exports = mongoose.model("admin",adminSchema);