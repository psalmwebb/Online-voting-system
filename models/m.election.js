const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
    position:{
        type:String,
        required:true,
        unique:true
    },
    numOfCandidate:{
        type:Number,
        required:true,
    },
    candidatesName:{
        type:Array,
    },
    votersName:{
        type:Array,
    }
})


module.exports = mongoose.model("elections",electionSchema);