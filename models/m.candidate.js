
const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        unique:true
    },
    lastName:{
        type:String,
        required:true,
        unique:true
    },
    post:{
        type:String,
        required:true,
        unique:true
    },
    numOfVotes:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model("candidates",candidateSchema);